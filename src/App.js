import "./App.scss";
import { Header, Products, Footer } from "./components";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("/products.json");
        const data = response.data;
        setProducts(data);
        getCategories(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const getCategories = (products) => {
      const categoryLocal = [];

      products.forEach((product) => {
        const categoryExist = categoryLocal.includes(product.category);

        if (!categoryExist) {
          categoryLocal.push(product.category);
        }
      });

      setCategories(categoryLocal);
    };

    getProducts();
  }, []);

  return (
    <div className="App">
      <Header cart={cart} />
      <Products
        products={products}
        categories={categories}
        addToCart={addToCart}
      />
      <Footer />
    </div>
  );
}

export default App;
