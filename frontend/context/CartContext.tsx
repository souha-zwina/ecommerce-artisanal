import { CartItem } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartContextType {
  items: CartItem[];
  addItem: (product: { id: string; nom: string; imageUrl: string; prix: number }) => void;
  addItemWithQuantity: (product: { id: string; nom: string; imageUrl: string; prix: number }, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const loadCart = async () => {
    try {
      const stored = await AsyncStorage.getItem('cart');
      if (stored) setItems(JSON.parse(stored));
    } catch (e) {
      console.error("Erreur chargement panier:", e);
    }
  };

  const addItem = (product: { id: string; nom: string; imageUrl: string; prix: number }) => {
    setItems(prev => {
      const exists = prev.find(i => i.productId === product.id);
      if (exists) {
        return prev.map(i =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, {
        productId: product.id,
        nom: product.nom,
        imageUrl: product.imageUrl,
        prix: product.prix,
        quantity: 1
      }];
    });
  };

  const addItemWithQuantity = (product: { id: string; nom: string; imageUrl: string; prix: number }, quantity: number) => {
    if (quantity <= 0) return;
    setItems(prev => {
      const exists = prev.find(i => i.productId === product.id);
      if (exists) {
        return prev.map(i =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, {
        productId: product.id,
        nom: product.nom,
        imageUrl: product.imageUrl,
        prix: product.prix,
        quantity: quantity
      }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(i => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.prix * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, addItemWithQuantity, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be in CartProvider');
  return ctx;
}