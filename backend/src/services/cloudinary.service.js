const cloudinary = require("../config/cloudinary");

async function uploadImage(filePath, folder = "sellbar/products") {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error("Cloudinary credentials are not configured");
  }

  if (!filePath) {
    throw new Error("Image file path is required");
  }

  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "image",
    transformation: [
      { width: 1600, height: 1600, crop: "limit" },
      { quality: "auto", fetch_format: "auto" }
    ]
  });

  return {
    publicId: result.public_id,
    url: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes
  };
}

async function deleteImage(publicId) {
  if (!publicId) {
    throw new Error("Cloudinary public ID is required");
  }

  return cloudinary.uploader.destroy(publicId, {
    resource_type: "image"
  });
}

function getOptimizedImageUrl(publicId, options = {}) {
  if (!publicId) {
    throw new Error("Cloudinary public ID is required");
  }

  return cloudinary.url(publicId, {
    secure: true,
    fetch_format: "auto",
    quality: "auto",
    ...options
  });
}

module.exports = {
  uploadImage,
  deleteImage,
  getOptimizedImageUrl
};