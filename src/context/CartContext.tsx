"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { getUserCart, saveUserCart } from '../lib/firestoreCart';

// Definir tipos básicos para producto y carrito
export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  stock: number;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  // Forzamos el tipo para acceder a user.id
  const uid = (session?.user as { id?: string })?.id;
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cargar carrito desde Firestore al iniciar sesión
  useEffect(() => {
    if (uid) {
      getUserCart(uid).then(setCart);
    } else {
      setCart([]);
    }
  }, [uid]);

  // Guardar carrito en Firestore cuando cambie
  const persistCart = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    if (uid) saveUserCart(uid, newCart);
  }, [uid]);

  const addToCart = (product: Product, quantity: number) => {
    const existing = cart.find(item => item.id === product.id);
    let newCart: CartItem[];
    if (existing) {
      newCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity }];
    }
    persistCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.id !== productId);
    persistCart(newCart);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const newCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    persistCart(newCart);
  };

  const clearCart = () => persistCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
