import React, { createContext, useEffect, useState } from "react";
import api from "../utils/api";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handler = (e) => {
      const p = e.detail?.product;
      if (p) addToCart(p, 1);
    };
    window.addEventListener("addToCart", handler);
    return () => window.removeEventListener("addToCart", handler);
  }, []);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const id = product._id;

      const exists = prev.find(i => i.product === id);

      if (exists) {
        return prev.map(i =>
          i.product === id ? { ...i, qty: i.qty + qty } : i
        );
      }

      return [...prev, {
        product: id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(i => i.product !== productId));
  };

  const clearCart = () => setCart([]);

  const checkout = async () => {
    try {
      const token = localStorage.getItem("token_customer");
      if (!token) throw new Error("Please login as customer to checkout.");

      const items = cart.map(i => ({ product: i.product, qty: i.qty, price: i.price, name: i.name }));
      const res = await api.post("/orders", { items });
      const pay = await api.post("/orders/pay", { orderId: res.data._id, providerId: `demo-${Date.now()}` });
      clearCart();
      return pay.data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
}
