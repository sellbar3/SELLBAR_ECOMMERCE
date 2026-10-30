import cloudinaryMapping from "@/config/cloudinary-mapping.json";

/**
 * Returns the Cloudinary secure URL for a given public folder path or existing URL.
 * Falls back to original path if not found in mapping.
 */
export function getCloudinaryUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return cloudinaryMapping[cleanPath] || path;
}

/**
 * Applies dynamic Cloudinary transformations for image optimization (width, format, quality)
 */
export function getOptimizedCloudinaryUrl(pathOrUrl, options = {}) {
  const url = getCloudinaryUrl(pathOrUrl);
  if (!url || !url.includes("res.cloudinary.com")) {
    return url;
  }

  const { width, height, quality = "auto", format = "auto", crop = "limit" } = options;
  const transformations = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);

  if (transformations.length === 0) return url;

  const transformString = transformations.join(",");
  // Inject transformation string after /upload/
  return url.replace("/upload/", `/upload/${transformString}/`);
}

export default getCloudinaryUrl;
