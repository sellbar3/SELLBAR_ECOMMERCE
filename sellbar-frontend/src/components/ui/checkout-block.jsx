"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import {
  CreditCard,
  Truck,
  Shield,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  ShoppingBag,
  Check,
  ChevronLeft,
  Percent,
  X,
  Tag,
  Wallet,
  Smartphone,
  Building2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Checkout({ initialItems }) {
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "DL",
    zipCode: "",
    country: "IN",
  });
  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    nameOnCard: "",
  });
  const [selectedPaymentType, setSelectedPaymentType] = useState("card");
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState("SAVE10");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const sampleOrderItems = [
    {
      id: "1",
      name: "Sellbar Certified Apple iPhone 14 (128GB)",
      price: 41999,
      originalPrice: 69900,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80",
      quantity: 1,
      discount: 40,
    },
    {
      id: "2",
      name: "Sellbar Certified MacBook Air M1 (8GB / 256GB)",
      price: 49999,
      originalPrice: 99900,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
      quantity: 1,
      discount: 50,
    },
    {
      id: "3",
      name: "Wireless ANC Bluetooth Earbuds",
      price: 2499,
      originalPrice: 4999,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
      quantity: 1,
      discount: 50,
    },
  ];

  const shippingMethods = [
    {
      id: "standard",
      name: "Standard Express Delivery",
      price: 0,
      time: "2-4 business days (Free)",
    },
    {
      id: "express",
      name: "Priority Next-Day Courier",
      price: 199,
      time: "Next business day",
    },
  ];

  const [selectedShipping, setSelectedShipping] = useState("standard");

  useEffect(() => {
    const loadCheckout = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (initialItems && initialItems.length > 0) {
        setOrderItems(initialItems);
      } else {
        setOrderItems(sampleOrderItems);
      }
      setIsLoading(false);
    };

    loadCheckout();
  }, [initialItems]);

  const calculateSummary = () => {
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = appliedPromo === "SAVE10" ? subtotal * 0.1 : 0;
    const shipping = selectedShipping === "standard" ? 0 : 199;
    const tax = Math.round((subtotal - discount) * 0.18); // 18% GST
    const total = subtotal - discount + shipping + tax;

    return {
      subtotal,
      discount,
      shipping,
      tax,
      total,
    };
  };

  const handleAddressChange = (field, value) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentMethod((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return !!(
          shippingAddress.firstName &&
          shippingAddress.lastName &&
          shippingAddress.email &&
          shippingAddress.address &&
          shippingAddress.city &&
          shippingAddress.state &&
          shippingAddress.zipCode
        );
      case 2:
        if (selectedPaymentType === "card") {
          return !!(
            paymentMethod.cardNumber &&
            paymentMethod.expiryMonth &&
            paymentMethod.expiryYear &&
            paymentMethod.cvv &&
            paymentMethod.nameOnCard
          );
        }
        return !!selectedPaymentType;
      case 3:
        return agreeToTerms;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const removePromo = () => {
    setAppliedPromo("");
  };

  const summary = calculateSummary();

  const CheckoutSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <Skeleton className="h-6 w-32" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col gap-4">
            <Skeleton className="h-6 w-24" />
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const OrderSummaryCard = () => (
    <Card className="flex flex-col gap-5">
      <CardHeader>
        <h3 className="font-semibold flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-[#2bbda3]" />
          Order Summary
        </h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Order Items */}
        <div className="flex flex-col gap-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <div className="relative w-14 h-14 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden border border-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <Badge
                  size="sm"
                  className="absolute -top-1 -right-1 text-xs min-w-5 h-5 flex items-center justify-center bg-[#2bbda3] text-white"
                >
                  {item.quantity}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-gray-900">{item.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#2bbda3]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{item.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-900">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </div>
            </div>
          ))}
        </div>
        {/* Applied Promo */}
        {appliedPromo && (
          <div className="flex items-center justify-between p-3 bg-teal-50/60 rounded-ele border border-teal-200">
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-[#2bbda3]" />
              <span className="text-sm font-medium text-teal-900">
                {appliedPromo} (10% Sellbar Discount)
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removePromo}
              className="h-6 w-6 p-0 text-teal-700 hover:text-teal-900"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        {/* Pricing Breakdown */}
        <div className="flex flex-col gap-2 border-t pt-4 text-gray-700">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{summary.subtotal.toLocaleString("en-IN")}</span>
          </div>
          {summary.discount > 0 && (
            <div className="flex justify-between text-sm text-emerald-600 font-medium">
              <span>Discount</span>
              <span>-₹{summary.discount.toLocaleString("en-IN")}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{summary.shipping === 0 ? "FREE" : `₹${summary.shipping}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>GST (18% Included)</span>
            <span>₹{summary.tax.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2 text-gray-900">
            <span>Total Payable</span>
            <span className="text-[#2bbda3]">₹{summary.total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-32" />
        </div>
        <CheckoutSkeleton />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 my-12 bg-white rounded-3xl border border-gray-100 shadow-md text-center space-y-6">
        <div className="w-16 h-16 bg-teal-50 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">Order Confirmed!</h2>
        <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
          Thank you for choosing Sellbar! Your order has been placed successfully and our 32-point inspection team is preparing your package for priority dispatch.
        </p>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs text-gray-600 space-y-1">
          <p>Order Reference: <strong className="text-gray-900 font-mono">SB-{Math.floor(100000 + Math.random() * 900000)}</strong></p>
          <p>Confirmation SMS sent to: <strong className="text-gray-900">{shippingAddress.phone || "Registered Number"}</strong></p>
        </div>
        <div className="pt-2 flex justify-center gap-3">
          <Button onClick={() => window.location.href = "/orders"} className="bg-[#2bbda3] text-white hover:bg-[#249e88]">
            View My Orders
          </Button>
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-4 flex-col">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Cart
          </Button>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              Secure Checkout
            </h1>
            <p className="text-muted-foreground text-sm">
              Complete your certified refurbished tech purchase securely
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-[#2bbda3] border-teal-200">
          <Shield className="h-3.5 w-3.5" />
          256-Bit SSL Encrypted
        </Badge>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-start gap-4 sm:gap-6 py-2 overflow-x-auto pb-2">
        {[
          { step: 1, label: "Shipping Address", icon: Truck },
          { step: 2, label: "Payment Method", icon: CreditCard },
          { step: 3, label: "Review & Confirm", icon: Check },
        ].map(({ step, label, icon: Icon }, index) => (
          <div key={step} className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                  currentStep >= step
                    ? "bg-[#2bbda3] border-[#2bbda3] text-white"
                    : "border-border text-muted-foreground"
                )}
              >
                {currentStep > step ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs sm:text-sm font-semibold",
                  currentStep >= step
                    ? "text-gray-900"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {index < 2 && (
              <div
                className={cn(
                  "w-8 sm:w-12 h-0.5",
                  currentStep > step ? "bg-[#2bbda3]" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Step 1: Shipping Information */}
          {currentStep === 1 && (
            <Card className="flex flex-col gap-6 border-gray-100 shadow-xs">
              <CardHeader>
                <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                  <MapPin className="h-5 w-5 text-[#2bbda3]" />
                  Delivery &amp; Pickup Address
                </h2>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      size="lg"
                      placeholder="e.g. Rahul"
                      value={shippingAddress.firstName}
                      onChange={(e) =>
                        handleAddressChange("firstName", e.target.value)
                      }
                      leftIcon={<User className="h-4 w-4" />}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      size="lg"
                      placeholder="e.g. Sharma"
                      value={shippingAddress.lastName}
                      onChange={(e) =>
                        handleAddressChange("lastName", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      size="lg"
                      type="email"
                      placeholder="rahul@example.com"
                      value={shippingAddress.email}
                      onChange={(e) =>
                        handleAddressChange("email", e.target.value)
                      }
                      leftIcon={<Mail className="h-4 w-4" />}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Mobile Number *</Label>
                    <Input
                      id="phone"
                      size="lg"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={shippingAddress.phone}
                      onChange={(e) =>
                        handleAddressChange("phone", e.target.value)
                      }
                      leftIcon={<Phone className="h-4 w-4" />}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="address">Full Street Address *</Label>
                  <Input
                    id="address"
                    size="lg"
                    placeholder="House/Flat No., Building, Street Area"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      handleAddressChange("address", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      size="lg"
                      placeholder="e.g. New Delhi"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        handleAddressChange("city", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="state">State / Region *</Label>
                    <Select
                      value={shippingAddress.state}
                      onValueChange={(value) =>
                        handleAddressChange("state", value)
                      }
                    >
                      <SelectTrigger className="text-sm" size={"lg"}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DL">Delhi NCR</SelectItem>
                        <SelectItem value="MH">Maharashtra</SelectItem>
                        <SelectItem value="KA">Karnataka</SelectItem>
                        <SelectItem value="TN">Tamil Nadu</SelectItem>
                        <SelectItem value="UP">Uttar Pradesh</SelectItem>
                        <SelectItem value="HR">Haryana</SelectItem>
                        <SelectItem value="WB">West Bengal</SelectItem>
                        <SelectItem value="GJ">Gujarat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="zipCode">PIN Code *</Label>
                    <Input
                      id="zipCode"
                      size="lg"
                      placeholder="110020"
                      value={shippingAddress.zipCode}
                      onChange={(e) =>
                        handleAddressChange("zipCode", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Shipping Methods */}
                <div className="flex flex-col gap-3 border-t pt-4">
                  <Label className="text-sm font-semibold">Delivery Speed</Label>
                  <div className="flex flex-col gap-3">
                    {shippingMethods.map((method) => (
                      <div
                        key={method.id}
                        className={cn(
                          "p-3.5 border rounded-ele cursor-pointer transition-colors",
                          selectedShipping === method.id
                            ? "border-[#2bbda3] bg-[#2bbda3]/5"
                            : "border-border hover:bg-accent"
                        )}
                        onClick={() => setSelectedShipping(method.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-4 h-4 rounded-full border-2 transition-colors",
                                selectedShipping === method.id
                                  ? "border-[#2bbda3] bg-[#2bbda3]"
                                  : "border-border"
                              )}
                            />
                            <div>
                              <div className="font-semibold text-sm text-gray-900">{method.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {method.time}
                              </div>
                            </div>
                          </div>
                          <div className="font-bold text-sm text-gray-900">
                            {method.price === 0 ? "FREE" : `₹${method.price}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={nextStep}
                  disabled={!validateStep(1)}
                  className="ml-auto bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold"
                  size="lg"
                >
                  Continue to Payment
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Payment Information */}
          {currentStep === 2 && (
            <Card className="flex flex-col gap-6 border-gray-100 shadow-xs">
              <CardHeader>
                <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                  <CreditCard className="h-5 w-5 text-[#2bbda3]" />
                  Select Payment Method
                </h2>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <Label className="text-sm font-semibold">
                    Choose How You Want to Pay
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* UPI / QR Code */}
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentType("upi")}
                      className={cn(
                        "flex items-center gap-3 p-4 border-2 rounded-ele transition-colors text-left",
                        selectedPaymentType === "upi"
                          ? "border-[#2bbda3] bg-[#2bbda3]/5"
                          : "border-border hover:border-[#2bbda3]/40"
                      )}
                    >
                      <Smartphone className="h-5 w-5 text-[#2bbda3]" />
                      <div>
                        <div className="font-bold text-sm text-gray-900">UPI Instant</div>
                        <div className="text-xs text-muted-foreground">
                          GPay, PhonePe, Paytm
                        </div>
                      </div>
                    </button>

                    {/* Credit/Debit Card */}
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentType("card")}
                      className={cn(
                        "flex items-center gap-3 p-4 border-2 rounded-ele transition-colors text-left",
                        selectedPaymentType === "card"
                          ? "border-[#2bbda3] bg-[#2bbda3]/5"
                          : "border-border hover:border-[#2bbda3]/40"
                      )}
                    >
                      <CreditCard className="h-5 w-5 text-[#2bbda3]" />
                      <div>
                        <div className="font-bold text-sm text-gray-900">Debit / Credit Card</div>
                        <div className="text-xs text-muted-foreground">
                          Visa, Mastercard, RuPay
                        </div>
                      </div>
                    </button>

                    {/* Net Banking */}
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentType("net-banking")}
                      className={cn(
                        "flex items-center gap-3 p-4 border-2 rounded-ele transition-colors text-left",
                        selectedPaymentType === "net-banking"
                          ? "border-[#2bbda3] bg-[#2bbda3]/5"
                          : "border-border hover:border-[#2bbda3]/40"
                      )}
                    >
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-bold text-sm text-gray-900">Net Banking</div>
                        <div className="text-xs text-muted-foreground">
                          All Major Indian Banks
                        </div>
                      </div>
                    </button>

                    {/* Cash on Delivery */}
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentType("cod")}
                      className={cn(
                        "flex items-center gap-3 p-4 border-2 rounded-ele transition-colors text-left",
                        selectedPaymentType === "cod"
                          ? "border-[#2bbda3] bg-[#2bbda3]/5"
                          : "border-border hover:border-[#2bbda3]/40"
                      )}
                    >
                      <Truck className="h-5 w-5 text-amber-600" />
                      <div>
                        <div className="font-bold text-sm text-gray-900">Cash on Delivery</div>
                        <div className="text-xs text-muted-foreground">
                          Pay at doorstep
                        </div>
                      </div>
                    </button>

                    {/* No-Cost EMI */}
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentType("emi")}
                      className={cn(
                        "flex items-center gap-3 p-4 border-2 rounded-ele transition-colors text-left",
                        selectedPaymentType === "emi"
                          ? "border-[#2bbda3] bg-[#2bbda3]/5"
                          : "border-border hover:border-[#2bbda3]/40"
                      )}
                    >
                      <Clock className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-bold text-sm text-gray-900">Easy EMI</div>
                        <div className="text-xs text-muted-foreground">
                          From ₹1,800/mo
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Credit Card Form */}
                {selectedPaymentType === "card" && (
                  <div className="flex flex-col gap-4 border-t pt-6">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="nameOnCard">Name on Card *</Label>
                      <Input
                        id="nameOnCard"
                        size="lg"
                        placeholder="e.g. Rahul Sharma"
                        value={paymentMethod.nameOnCard}
                        onChange={(e) =>
                          handlePaymentChange("nameOnCard", e.target.value)
                        }
                        leftIcon={<User className="h-4 w-4" />}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        size="lg"
                        placeholder="1234 5678 9012 3456"
                        value={paymentMethod.cardNumber}
                        onChange={(e) =>
                          handlePaymentChange("cardNumber", e.target.value)
                        }
                        leftIcon={<CreditCard className="h-4 w-4" />}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="expiryMonth">Month *</Label>
                        <Select
                          value={paymentMethod.expiryMonth}
                          onValueChange={(value) =>
                            handlePaymentChange("expiryMonth", value)
                          }
                        >
                          <SelectTrigger className="text-sm" size={"lg"}>
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem
                                key={i + 1}
                                value={String(i + 1).padStart(2, "0")}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="expiryYear">Year *</Label>
                        <Select
                          value={paymentMethod.expiryYear}
                          onValueChange={(value) =>
                            handlePaymentChange("expiryYear", value)
                          }
                        >
                          <SelectTrigger className="text-sm" size={"lg"}>
                            <SelectValue placeholder="YYYY" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem
                                key={2026 + i}
                                value={String(2026 + i)}
                              >
                                {2026 + i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          size="lg"
                          placeholder="123"
                          maxLength={4}
                          value={paymentMethod.cvv}
                          onChange={(e) =>
                            handlePaymentChange("cvv", e.target.value)
                          }
                          leftIcon={<Lock className="h-4 w-4" />}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Info */}
                {selectedPaymentType === "upi" && (
                  <div className="border-t pt-4">
                    <div className="bg-teal-50/60 border border-teal-200 rounded-ele p-4">
                      <div className="flex items-start gap-3">
                        <Smartphone className="h-5 w-5 text-[#2bbda3] mt-0.5" />
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">
                            UPI QR &amp; App Redirect
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            You will be prompted to approve the payment on Google Pay, PhonePe, or Paytm securely.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={prevStep}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!validateStep(2)}
                  className="bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold"
                  size="lg"
                >
                  Review Order
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Review Order */}
          {currentStep === 3 && (
            <Card className="flex flex-col gap-6 border-gray-100 shadow-xs">
              <CardHeader>
                <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                  <Check className="h-5 w-5 text-[#2bbda3]" />
                  Review Your Order Details
                </h2>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                {/* Shipping Address Review */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-sm text-gray-900">Delivery Address</h3>
                  <div className="text-sm text-gray-700 p-4 bg-gray-50 rounded-ele border border-gray-100 space-y-1">
                    <p className="font-bold text-gray-900">
                      {shippingAddress.firstName} {shippingAddress.lastName}
                    </p>
                    <p>{shippingAddress.address}</p>
                    <p>
                      {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.zipCode}
                    </p>
                    <p className="text-xs text-gray-500 pt-1">
                      Phone: {shippingAddress.phone} | Email: {shippingAddress.email}
                    </p>
                  </div>
                </div>

                {/* Payment Method Review */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-sm text-gray-900">Payment Option</h3>
                  <div className="text-sm text-gray-700 p-4 bg-gray-50 rounded-ele border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium">
                      <CreditCard className="w-4 h-4 text-[#2bbda3]" />
                      <span className="capitalize">{selectedPaymentType.replace("-", " ")}</span>
                    </div>
                    <span className="text-xs font-bold text-[#2bbda3] bg-teal-50 px-2 py-0.5 rounded">
                      Authorized
                    </span>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start gap-2 border-t pt-4">
                  <Checkbox
                    id="agreeTerms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) =>
                      setAgreeToTerms(checked === true)
                    }
                  />
                  <Label
                    htmlFor="agreeTerms"
                    className="text-xs text-gray-600 leading-relaxed cursor-pointer"
                  >
                    I agree to the Sellbar{" "}
                    <Link href="/terms-conditions" className="text-[#2bbda3] font-semibold underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/refund-policy" className="text-[#2bbda3] font-semibold underline">
                      7-Day Replacement Policy
                    </Link>
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={prevStep}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={() => setOrderPlaced(true)}
                  disabled={!validateStep(3)}
                  size="lg"
                  className="bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold flex items-center gap-2 shadow-md"
                >
                  <Lock className="h-4 w-4" />
                  Pay ₹{summary.total.toLocaleString("en-IN")} &amp; Confirm Order
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="flex flex-col gap-4">
          <OrderSummaryCard />

          <Card className="border-gray-100 shadow-xs">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-[#2bbda3] shrink-0" />
                <div>
                  <div className="font-bold text-gray-900 text-xs">Sellbar Assured Guarantee</div>
                  <div className="text-[11px] text-muted-foreground">
                    12 Months Warranty + 7 Days Return
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { Checkout };
