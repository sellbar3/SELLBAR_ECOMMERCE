const cloudinary = require("../config/cloudinary");

function assertConfigured() {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error("Cloudinary credentials are not configured");
  }
}

const TRANSFORMATION = [
  { width: 1600, height: 1600, crop: "limit" },
  { quality: "auto", fetch_format: "auto" },
];

const formatResult = (result) => ({
  publicId: result.public_id,
  url: result.secure_url,
  width: result.width,
  height: result.height,
  format: result.format,
  bytes: result.bytes,
});

// File path se upload (diskStorage)
async function uploadImage(filePath, folder = "sellbar/products") {
  assertConfigured();
  if (!filePath) throw new Error("Image file path is required");

  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "image",
    transformation: TRANSFORMATION,
  });
  return formatResult(result);
}

// Buffer se upload (memoryStorage)
function uploadImageBuffer(buffer, folder = "sellbar/products") {
  assertConfigured();
  if (!buffer) throw new Error("Image buffer is required");

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image", transformation: TRANSFORMATION },
      (error, result) => (error ? reject(error) : resolve(formatResult(result)))
    );
    stream.end(buffer);
  });
}

async function deleteImage(publicId) {
  if (!publicId) throw new Error("Cloudinary public ID is required");
  return cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}

function getOptimizedImageUrl(publicId, options = {}) {
  if (!publicId) throw new Error("Cloudinary public ID is required");
  return cloudinary.url(publicId, {
    secure: true,
    fetch_format: "auto",
    quality: "auto",
    ...options,
  });
}

module.exports = { uploadImage, uploadImageBuffer, deleteImage, getOptimizedImageUrl };