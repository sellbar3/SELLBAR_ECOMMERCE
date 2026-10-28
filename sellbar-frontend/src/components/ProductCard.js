
"use client";

export default function ProductCard({
  product,
  onAddToCart,
}) {
  const image =
    product.images?.find((item) => item?.url)?.url ||
    product.image ||
    "";

  const price = Number(product.price || 0);

  return (
    <article className="sellbar-product-card">
      <div className="sellbar-product-image">
        {image ? (
          <img src={image} alt={product.name || "Product"} />
        ) : (
          <div className="sellbar-no-image">No image</div>
        )}
      </div>

      <div className="sellbar-product-info">
        <p className="sellbar-product-category">
          {product.category?.name || product.category || "Products"}
        </p>

        <h3>{product.name}</h3>

        <p className="sellbar-product-price">
          ₹{price.toLocaleString("en-IN")}
        </p>

        <button
          type="button"
          className="sellbar-add-button"
          disabled={Number(product.stock ?? 1) <= 0}
          onClick={() => onAddToCart?.(product)}
        >
          {Number(product.stock ?? 1) <= 0
            ? "Out of Stock"
            : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
