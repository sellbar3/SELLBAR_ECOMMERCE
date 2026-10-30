const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const publicProductController = require("../controllers/customer/publicProduct.controller");

async function testApi() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB for API test");

  // Mock res helper
  const mockRes = () => {
    const res = {};
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
    res.json = (data) => {
      res.data = data;
      return res;
    };
    return res;
  };

  // Test 1: getProducts
  const req1 = { query: {} };
  const res1 = mockRes();
  await publicProductController.getProducts(req1, res1, (err) => console.error(err));
  console.log(`Test 1 (All products): Success = ${res1.data.success}, Count = ${res1.data.data.products.length}`);
  console.log("Sample image url:", res1.data.data.products[0]?.images[0]?.url);

  // Test 2: getProducts by category slug "mobile-phones"
  const req2 = { query: { category: "mobile-phones" } };
  const res2 = mockRes();
  await publicProductController.getProducts(req2, res2, (err) => console.error(err));
  console.log(`Test 2 (Mobile Phones): Success = ${res2.data.success}, Count = ${res2.data.data.products.length}`);

  // Test 3: getProducts by category slug "laptop"
  const req3 = { query: { category: "laptop" } };
  const res3 = mockRes();
  await publicProductController.getProducts(req3, res3, (err) => console.error(err));
  console.log(`Test 3 (Laptops): Success = ${res3.data.success}, Count = ${res3.data.data.products.length}`);

  // Test 4: getFeaturedProducts (type: "hot-deal")
  const req4 = { query: { type: "hot-deal" } };
  const res4 = mockRes();
  await publicProductController.getFeaturedProducts(req4, res4, (err) => console.error(err));
  console.log(`Test 4 (Hot Deals): Success = ${res4.data.success}, Count = ${res4.data.data.products.length}`);

  // Test 5: getProductById with slug
  const req5 = { params: { id: "apple-iphone-14-128gb-refurbished" } };
  const res5 = mockRes();
  await publicProductController.getProductById(req5, res5, (err) => console.error(err));
  console.log(`Test 5 (Get by slug): Success = ${res5.data.success}, Name = ${res5.data.data.product?.name}, Related count = ${res5.data.data.relatedProducts?.length}`);

  // Test 6: getCategories
  const req6 = { query: {} };
  const res6 = mockRes();
  await publicProductController.getCategories(req6, res6, (err) => console.error(err));
  console.log(`Test 6 (Categories): Success = ${res6.data.success}, Categories = ${res6.data.data.categories.length}`);
  console.log("Categories sample:", res6.data.data.categories.map(c => `${c.name} (${c.productCount})`).join(", "));

  process.exit(0);
}

testApi().catch((err) => {
  console.error("API test error:", err);
  process.exit(1);
});
