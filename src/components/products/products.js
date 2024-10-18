import "./products.scss";
import { useState } from "react";

const Products = (props) => {
  const { products, categories, addToCart } = props;
  const [selectedCategory, setSelectedCategory] = useState("");
  const chooseCategory = (category) => {
    setSelectedCategory(category);
    console.log("Selected Category:", category);
  };

  return (
    <div className="app-products-container container">
      {/* Category buttons */}
      <div className="categories">
        {categories &&
          categories.map((category, index) => (
            <button
              key={index}
              className={`btn category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => chooseCategory(category)}
            >
              {category}
            </button>
          ))}
        <button
          className={`btn category-btn ${
            selectedCategory === "" ? "active" : ""
          }`}
          onClick={() => chooseCategory("")} // Clear selection (show all)
        >
          All
        </button>
      </div>

      {/* Product grid */}
      <div className="products-grid">
        {products
          .filter((product) =>
            selectedCategory ? product.category === selectedCategory : true
          )
          .map((product) => (
            <div key={product.id} className="product">
              <div
                className="img"
                style={{
                  backgroundImage: `url(${product.img})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <h4>{product.name}</h4>
              <p className="description" title={product.description}>
                {product.description}
              </p>

              {/* Show discounted and original price */}
              <div className="price-container">
                {product.discountPrice ? (
                  <>
                    <span className="price original-price">
                      {product.originalPrice} PLN
                    </span>
                    <span className="price discount-price">
                      {product.discountPrice} PLN
                    </span>
                  </>
                ) : (
                  <span className="price">{product.originalPrice} PLN</span>
                )}
              </div>

              <button
                className="btn buy-btn"
                onClick={() => addToCart(product)}
              >
                BUY
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
