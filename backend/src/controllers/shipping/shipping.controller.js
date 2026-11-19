const Order = require("../../models/Order");
const Vendor = require("../../models/Vendor");
const Shipment = require("../../models/Shipment");
const logisticsService = require("../../services/logistics.service");
const { checkServiceability, SERVICEABLE_PINCODES, PINCODE_DIRECTORY } = require("../../utils/serviceability");

// POST /api/shipping/generate-awb
// 1-Click AWB Tracking Number & Barcode Shipping Label Generator for Admin & Vendors
exports.generateAWB = async (req, res, next) => {
  try {
    const { orderId, courierPreference, weight } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "orderId is required to generate AWB",
      });
    }

    const order = await Order.findById(orderId).populate("vendor customer");
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Role verification: If vendor, must own the order
    if (req.user?.role === "vendor" && req.vendor) {
      if (order.vendor?._id?.toString() !== req.vendor._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to manage shipments for this order.",
        });
      }
    }

    // Generate AWB via logistics service
    const awbResult = await logisticsService.generateAWB({
      order,
      vendor: order.vendor,
      courierPreference: courierPreference || (order.isPanIndia ? "delhivery" : "sellbar_local"),
      weight: weight || 0.6,
    });

    const labelUrl = `/api/shipping/label/${order._id}`;

    // Update order with AWB and shipping fields
    order.awbNumber = awbResult.awbNumber;
    order.shippingCarrier = awbResult.courierPartner;
    order.shippingLabelUrl = labelUrl;
    order.courierTrackingUrl = awbResult.trackingUrl;
    order.shippingStatus = "awb_assigned";
    if (order.orderStatus === "pending") {
      order.orderStatus = "confirmed";
    }
    await order.save();

    // Create or update Shipment document
    let shipment = await Shipment.findOne({ order: order._id });
    if (!shipment) {
      shipment = new Shipment({
        order: order._id,
        vendor: order.vendor?._id,
        courierPartner: awbResult.courierPartner,
        courierCode: awbResult.courierCode,
        awbNumber: awbResult.awbNumber,
        shippingLabelUrl: labelUrl,
        trackingUrl: awbResult.trackingUrl,
        routingCode: awbResult.routingCode,
        packageDimensions: { weight: awbResult.weight, length: 22, breadth: 16, height: 8 },
        deliveryAddress: {
          fullName: order.shippingAddress.fullName,
          phone: order.shippingAddress.phone,
          addressLine1: order.shippingAddress.addressLine1,
          city: order.shippingAddress.city,
          state: order.shippingAddress.state,
          postalCode: order.shippingAddress.postalCode,
        },
        isCod: order.paymentMethod === "cod",
        codAmount: order.paymentMethod === "cod" ? order.total : 0,
        status: "awb_assigned",
        events: awbResult.events,
      });
    } else {
      shipment.awbNumber = awbResult.awbNumber;
      shipment.courierPartner = awbResult.courierPartner;
      shipment.trackingUrl = awbResult.trackingUrl;
      shipment.shippingLabelUrl = labelUrl;
      shipment.status = "awb_assigned";
    }
    await shipment.save();

    return res.status(200).json({
      success: true,
      message: `AWB ${awbResult.awbNumber} successfully generated via ${awbResult.courierPartner}!`,
      data: {
        orderId: order._id,
        awbNumber: awbResult.awbNumber,
        courierPartner: awbResult.courierPartner,
        trackingUrl: awbResult.trackingUrl,
        shippingLabelUrl: labelUrl,
        routingCode: awbResult.routingCode,
        shippingStatus: "awb_assigned",
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/shipping/label/:orderId
// Serves print-ready Barcode Shipping Label HTML / PDF
exports.getShippingLabel = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("vendor").lean();

    if (!order) {
      return res.status(404).send("<h3>Order not found for shipping label generation</h3>");
    }

    const shipment = await Shipment.findOne({ order: order._id }).lean();
    const vendor = order.vendor || (await Vendor.findOne({}).lean());

    const labelHtml = logisticsService.generateShippingLabelHTML({
      order,
      shipment: shipment || {
        awbNumber: order.awbNumber || `DEL${Date.now().toString().slice(-9)}`,
        courierPartner: order.shippingCarrier || "Delhivery Surface",
        routingCode: `DEL-PAT-${order.shippingAddress?.postalCode || "845438"}`,
        packageDimensions: { weight: 0.5 },
      },
      vendor,
    });

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.send(labelHtml);
  } catch (error) {
    next(error);
  }
};

// GET /api/shipping/track/:orderIdOrAwb
exports.trackShipment = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if MongoDB ObjectId (orderId) or AWB string
    let awb = id;
    let orderCreatedAt = new Date();

    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      const order = await Order.findById(id).select("awbNumber createdAt shippingCarrier");
      if (order?.awbNumber) {
        awb = order.awbNumber;
        orderCreatedAt = order.createdAt;
      }
    }

    const trackingData = await logisticsService.getTrackingDetails(awb, orderCreatedAt);

    return res.status(200).json({
      success: true,
      data: trackingData,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/shipping/check?pincode=...
exports.checkPincode = (req, res) => {
  const { pincode } = req.query;
  const result = checkServiceability(pincode);
  return res.status(200).json({
    success: true,
    data: result,
  });
};

// GET /api/shipping/pincodes
exports.getPincodes = (req, res) => {
  return res.status(200).json({
    success: true,
    serviceablePincodes: SERVICEABLE_PINCODES,
    directory: PINCODE_DIRECTORY,
    panIndiaSupported: true,
  });
};
