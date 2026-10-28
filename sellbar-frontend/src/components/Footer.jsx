"use client";

export default function Footer({ categories, setCategory, onResetFilters }) {
  return (
    <footer className="ft">
      <button
        className="ft-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </button>

      <div className="ft-grid">
        <div>
          <h4>About SELLBAR</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
          <a href="#">Contact Us</a>
        </div>

        <div>
          <h4>Help</h4>
          <a href="/orders">Your Orders</a>
          <a href="#">Payments</a>
          <a href="#">Shipping</a>
          <a href="#">Returns &amp; Refunds</a>
        </div>

        <div>
          <h4>Shop by Category</h4>
          {categories.slice(0, 6).map((item) => (
            <a
              key={item._id || item.name}
              href="#products"
              onClick={() => setCategory(item.name)}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div>
          <h4>Sell with Us</h4>
          <a href="#account">Sell on SELLBAR</a>
          <a href="#account">Become a Seller</a>
        </div>

        <div>
          <h4>Follow Us</h4>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">YouTube</a>
        </div>
      </div>

      <div className="ft-pay">
        <span>We accept</span>
        <b>UPI</b>
        <b>Cards</b>
        <b>Net Banking</b>
        <b>Cash on Delivery</b>
      </div>

      <div className="ft-bottom">
        <a href="#" className="ft-logo" onClick={onResetFilters}>
          SELL<span>BAR</span>
        </a>
        <nav>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Returns Policy</a>
        </nav>
        <p>© 2026 SELLBAR. All rights reserved.</p>
      </div>
    </footer>
  );
}