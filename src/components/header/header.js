import "./header.scss";
import CartIcon from "./cart.icon";
import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import napis from "./Napis.png";

const Header = (props) => {
  const { cart } = props;
  const [cartState, setCartState] = useState(false);
  const [localCart, setLocalCart] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const cartClick = () => setCartState(!cartState);

  const getTotalPrice = (cart) => {
    if (cart.length === 0) return "0.00";
    let totalPrice = 0;
    cart.forEach((product) => {
      const priceToUse = product.discountPrice || product.price; // Użyj ceny zniżkowej, jeśli istnieje
      totalPrice += priceToUse;
    });

    // Zastosuj rabat (jeśli istnieje)
    const discountedTotal = totalPrice * (1 - discountPercentage / 100);
    return discountedTotal.toFixed(2);
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscount = () => {
    // Prosty przykład — przy kodzie 'HELLO10' zastosuj 10% rabatu
    if (discountCode === "HELLO10") {
      setDiscountPercentage(10);
    } else {
      setDiscountPercentage(0); // Resetuj, jeśli kod jest nieprawidłowy
    }
  };

  useEffect(() => {
    const setupCart = (cart) => {
      let items = [];
      cart.forEach((product) => {
        const foundItem = items.find(({ id }) => id === product.id);
        const priceToUse = product.discountPrice || product.price; // Użyj ceny zniżkowej, jeśli istnieje
        if (foundItem) {
          items = items.map((item) => {
            if (item.id === foundItem.id) {
              return {
                ...item,
                count: item.count + 1,
                totalPrice: (item.count + 1) * priceToUse,
              };
            }
            return item;
          });
        } else {
          items.push({
            id: product.id,
            name: product.name,
            count: 1,
            price: priceToUse, // Użyj ceny zniżkowej, jeśli istnieje
            totalPrice: priceToUse,
          });
        }
      });
      setLocalCart(items);
    };
    setupCart(cart);
  }, [cart]);

  return (
    <div className="app-header-container">
      <header>
        <div className="header container">
          <img src={logo} alt="Logo" />
          <img src={napis} alt="Napis" />
          <div onClick={cartClick}>
            <CartIcon width={40} />
          </div>
        </div>
      </header>
      {cartState && (
        <div className="cart animate__animated animate__bounce">
          <h2>Koszyk</h2>
          {localCart.map((product) => (
            <div key={product.id}>
              <p>
                {product.name} ilość: {product.count}
              </p>
            </div>
          ))}
          <p className="price">
            Razem: <br /> {getTotalPrice(cart)} PLN
          </p>

          <div className="discount-code-container">
            <input
              type="text"
              value={discountCode}
              onChange={handleDiscountCodeChange}
              placeholder="Wpisz kod rabatowy"
            />
            <button onClick={applyDiscount}>Zastosuj rabat</button>
          </div>

          {discountPercentage > 0 && (
            <p className="discount-info">
              Zastosowano rabat: {discountPercentage}%
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
