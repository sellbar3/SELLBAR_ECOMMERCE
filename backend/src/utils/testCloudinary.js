require("dotenv").config();

const cloudinary = require("../config/cloudinary");

async function testCloudinary() {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        folder: "sellbar/test",
        public_id: "shoes",
        overwrite: true,
        resource_type: "image"
      }
    );

    console.log("Upload successful!");
    console.log("Image URL:", result.secure_url);

    const optimizedUrl = cloudinary.url(result.public_id, {
      secure: true,
      fetch_format: "auto",
      quality: "auto",
      width: 500,
      height: 500,
      crop: "auto",
      gravity: "auto"
    });

    console.log("Optimized URL:", optimizedUrl);
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    process.exitCode = 1;
  }
}

testCloudinary();