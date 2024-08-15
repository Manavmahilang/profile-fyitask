'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

type CartContextType = {
    cartItems: CartItem[];
    addItemToCart: (item: CartItem) => void;
    removeItemFromCart: (id: number) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
    calculateTotalPrice: () => number;
    discount: number;
    finalPrice: number;
    cartItemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [discount, setDiscount] = useState<number>(0);

    const addItemToCart = (item: CartItem) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeItemFromCart = (id: number) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const updateItemQuantity = (id: number, quantity: number) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
            )
        );
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const finalPrice = calculateTotalPrice() - discount;

    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, updateItemQuantity, calculateTotalPrice, discount, finalPrice, cartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};
