const mongoose = require("mongoose");

const Review = require("../../models/Review");
const Product = require("../../models/Product");

const MAX_PAGE_SIZE = 50;

function isValidObjectId(id) {
  return mongoose.isValidObjectId(id);
}

function parseRating(value) {
  if (
    value === "" ||
    value === null ||
    value === undefined ||
    !["number", "string"].includes(typeof value) ||
    (typeof value === "string" && !value.trim())
  ) {
    throw new Error("Rating must be a whole number between 1 and 5");
  }

  const rating = Number(value);

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be a whole number between 1 and 5");
  }

  return rating;
}

function handleError(res, error) {
  if (error.message?.toLowerCase().includes("rating must be")) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "You have already reviewed this product",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Review operation failed",
  });
}

function requireCustomer(req, res) {
  
  if (!req.user?._id) {
    res.status(401).json({
      success: false,
      message: "Authentication is required",
    });

    return false;
  }

  if (req.user.role !== "customer") {
    res.status(403).json({
      success: false,
      message: "Only customers can manage reviews",
    });

    return false;
  }

  return true;
}

// POST /api/products/:productId/reviews
exports.createReview = async (req, res, next) => {
  try {
    if (!requireCustomer(req, res)) return;

    const { productId } = req.params;
    const { rating, title, comment } = req.body;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    if (typeof comment !== "string" || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "A comment is required",
      });
    }

    if (comment.trim().length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot exceed 2000 characters",
      });
    }

    if (title !== undefined && typeof title !== "string") {
      return res.status(400).json({
        success: false,
        message: "Title must be text",
      });
    }

    if (typeof title === "string" && title.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: "Title cannot exceed 100 characters",
      });
    }

    const reviewRating = parseRating(rating);

    const product = await Product.findOne({
      _id: productId,
      status: "active",
    }).select("_id");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Active product not found",
      });
    }

    const existingReview = await Review.exists({
      product: product._id,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const review = await Review.create({
      product: product._id,
      user: req.user._id,
      rating: reviewRating,
      title: title?.trim() || "",
      comment: comment.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: { review },
    });
  } catch (error) {
    if (
      error instanceof mongoose.Error ||
      error.code === 11000 ||
      error.message?.toLowerCase().includes("rating must be")
    ) {
      return handleError(res, error);
    }

    return next(error);
  }
};

// GET /api/products/:productId/reviews
exports.getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const page = Math.max(
      1,
      parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, parseInt(req.query.limit, 10) || 10)
    );

    const product = await Product.findOne({
      _id: productId,
      status: "active",
    }).select("_id");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Active product not found",
      });
    }

    const productObjectId = product._id;

    const [reviews, total, summary] = await Promise.all([
      Review.find({ product: productObjectId })
        .populate("user", "name")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      Review.countDocuments({
        product: productObjectId,
      }),

      Review.aggregate([
        { $match: { product: productObjectId } },
        {
          $group: {
            _id: "$product",
            averageRating: { $avg: "$rating" },
            totalReviews: { $sum: 1 },
          },
        },
      ]),
    ]);

    const stats = summary[0] || {
      averageRating: 0,
      totalReviews: 0,
    };

    return res.status(200).json({
      success: true,
      data: {
        reviews,
        summary: {
          averageRating:
            Math.round((stats.averageRating || 0) * 10) / 10,
          totalReviews: stats.totalReviews || 0,
        },
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

// PATCH /api/reviews/:id
exports.updateMyReview = async (req, res, next) => {
  try {
    if (!requireCustomer(req, res)) return;

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID",
      });
    }

    const { rating, title, comment } = req.body;

    if (
      rating === undefined &&
      title === undefined &&
      comment === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update",
      });
    }

    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (rating !== undefined) {
      review.rating = parseRating(rating);
    }

    if (title !== undefined) {
      if (typeof title !== "string") {
        return res.status(400).json({
          success: false,
          message: "Title must be text",
        });
      }

      if (title.trim().length > 100) {
        return res.status(400).json({
          success: false,
          message: "Title cannot exceed 100 characters",
        });
      }

      review.title = title.trim();
    }

    if (comment !== undefined) {
      if (typeof comment !== "string" || !comment.trim()) {
        return res.status(400).json({
          success: false,
          message: "Comment cannot be empty",
        });
      }

      if (comment.trim().length > 2000) {
        return res.status(400).json({
          success: false,
          message: "Comment cannot exceed 2000 characters",
        });
      }

      review.comment = comment.trim();
    }

    await review.save();

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: { review },
    });
  } catch (error) {
    if (
      error instanceof mongoose.Error ||
      error.code === 11000 ||
      error.message?.toLowerCase().includes("rating must be")
    ) {
      return handleError(res, error);
    }

    return next(error);
  }
};

// DELETE /api/reviews/:id
exports.deleteMyReview = async (req, res, next) => {
  try {
    if (!requireCustomer(req, res)) return;

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID",
      });
    }

    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
