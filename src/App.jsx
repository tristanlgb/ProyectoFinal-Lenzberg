// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";

const App = () => {
  const [cartItems, setCartItems] = useState({});
  const [showCart, setShowCart] = useState(false);

  // Function to add products to cart
  const addToCart = (product) => {
    if (!product || !product.id) return; // Prevent adding undefined products

    setCartItems((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[product.id]) {
        newCart[product.id].quantity += product.quantity;
      } else {
        newCart[product.id] = { ...product };
      }
      return newCart;
    });
    setShowCart(true); // Open cart modal when adding an item
  };

  const updateQuantity = (productId, amount) => {
    setCartItems((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId]) {
        newCart[productId].quantity = Math.max(1, newCart[productId].quantity + amount);
        if (newCart[productId].quantity === 0) delete newCart[productId];
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  return (
    <Router>
      <MyNavbar cartItemCount={Object.values(cartItems).reduce((total, item) => total + item.quantity, 0)} handleShowCart={() => setShowCart(true)} />
      <Routes>
        <Route path="/" element={<ItemListContainer addToCart={addToCart} />} />
        <Route path="/category/:category" element={<ItemListContainer addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ItemDetailContainer addToCart={addToCart} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Cart Modal */}
      <Cart show={showCart} handleClose={() => setShowCart(false)} cartItems={Object.values(cartItems)} setCartItems={setCartItems} updateQuantity={updateQuantity} clearCart={clearCart} />
    </Router>
  );
};

export default App;
