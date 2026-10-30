const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const cloudinary = require("../config/cloudinary");

const PUBLIC_DIR = path.resolve(__dirname, "../../../sellbar-frontend/public");
const MAPPING_OUTPUT_BACKEND = path.resolve(__dirname, "../config/cloudinary-mapping.json");
const MAPPING_OUTPUT_FRONTEND = path.resolve(__dirname, "../../../sellbar-frontend/src/config/cloudinary-mapping.json");

const SUPPORTED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

function getAllImageFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllImageFiles(filePath, baseDir));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        const relativePath = "/" + path.relative(baseDir, filePath).replace(/\\/g, "/");
        results.push({
          fullPath: filePath,
          relativePath,
          ext,
          filename: path.basename(file, ext)
        });
      }
    }
  }
  return results;
}

async function uploadToCloudinary(fileObj) {
  // Determine folder and public_id
  // e.g. /banners/hero-banner-1.webp -> folder: sellbar/banners, public_id: hero-banner-1
  const parts = fileObj.relativePath.replace(/^\//, "").split("/");
  parts.pop(); // remove filename
  const folder = parts.length > 0 ? `sellbar/${parts.join("/")}` : "sellbar/icons";
  
  const options = {
    folder,
    public_id: fileObj.filename,
    resource_type: "auto",
    overwrite: true,
    unique_filename: false
  };

  const res = await cloudinary.uploader.upload(fileObj.fullPath, options);
  return {
    relativePath: fileObj.relativePath,
    secureUrl: res.secure_url,
    publicId: res.public_id,
    format: res.format,
    bytes: res.bytes
  };
}

async function main() {
  console.log("=== STARTING CLOUDINARY IMAGE MIGRATION ===");
  console.log(`Scanning public directory: ${PUBLIC_DIR}`);

  const files = getAllImageFiles(PUBLIC_DIR);
  console.log(`Found ${files.length} image files to migrate.\n`);

  // Load existing mapping if any to avoid unnecessary re-uploads
  let mapping = {};
  if (fs.existsSync(MAPPING_OUTPUT_BACKEND)) {
    try {
      mapping = JSON.parse(fs.readFileSync(MAPPING_OUTPUT_BACKEND, "utf8"));
    } catch (_) {}
  }

  const results = {
    total: files.length,
    uploaded: 0,
    failed: 0,
    errors: []
  };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    process.stdout.write(`[${i + 1}/${files.length}] Uploading ${file.relativePath}... `);
    try {
      const uploadRes = await uploadToCloudinary(file);
      mapping[file.relativePath] = uploadRes.secureUrl;
      results.uploaded++;
      console.log(`DONE -> ${uploadRes.secureUrl}`);
    } catch (err) {
      results.failed++;
      results.errors.push({ file: file.relativePath, error: err.message });
      console.log(`FAILED: ${err.message}`);
    }
  }

  // Ensure directories exist
  fs.mkdirSync(path.dirname(MAPPING_OUTPUT_BACKEND), { recursive: true });
  fs.mkdirSync(path.dirname(MAPPING_OUTPUT_FRONTEND), { recursive: true });

  fs.writeFileSync(MAPPING_OUTPUT_BACKEND, JSON.stringify(mapping, null, 2), "utf8");
  fs.writeFileSync(MAPPING_OUTPUT_FRONTEND, JSON.stringify(mapping, null, 2), "utf8");

  console.log("\n=== MIGRATION COMPLETED ===");
  console.log(`Total scanned: ${results.total}`);
  console.log(`Successfully uploaded: ${results.uploaded}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Saved mapping to:\n  - ${MAPPING_OUTPUT_BACKEND}\n  - ${MAPPING_OUTPUT_FRONTEND}`);
  
  if (results.errors.length > 0) {
    console.log("Errors:", results.errors);
  }
}

main().catch(err => {
  console.error("Migration fatal error:", err);
  process.exit(1);
});
