'use client';
import { useContext, useState, useEffect, createContext, ReactNode } from 'react';

type CartItem = {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

type DiscountType = 'flat' | 'percentage';

type DiscountCode = {
    code: string;
    type: DiscountType;
    value: number;
    minItems?: number;
};

type CartContextType = {
    cartItems: CartItem[];
    addItemToCart: (item: CartItem) => void;
    removeItemFromCart: (id: number) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
    calculateTotalPrice: () => number;
    applyDiscountCode: (code: string) => void;
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

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error('Failed to load cart items from localStorage:', error);
        }
    }, []);

    // Saving cart items to localStorage whenever cartItems state changes
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Failed to save cart items to localStorage:', error);
        }
    }, [cartItems]);

    const addItemToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                // If item already exists, increase the quantity
                return prevItems.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            } else {
                // Otherwise, add new item
                return [...prevItems, item];
            }
        });
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

    const discountCodes: DiscountCode[] = [
        { code: 'FLAT50', type: 'flat', value: 50 },
        { code: 'SAVE10', type: 'percentage', value: 10 },
        { code: 'MIN3SAVE15', type: 'percentage', value: 15, minItems: 3 },
    ];

    const applyDiscountCode = (code: string) => {
        const discountCode = discountCodes.find(discount => discount.code === code);
        if (!discountCode) {
            setDiscount(0);
            return;
        }

        const totalPrice = calculateTotalPrice();
        const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

        if (discountCode.minItems && itemCount < discountCode.minItems) {
            setDiscount(0);
            return;
        }

        if (discountCode.type === 'flat') {
            setDiscount(discountCode.value);
        } else if (discountCode.type === 'percentage') {
            setDiscount((totalPrice * discountCode.value) / 100);
        }
    };

    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const finalPrice = calculateTotalPrice() - discount;

    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, updateItemQuantity, calculateTotalPrice, applyDiscountCode, discount, finalPrice, cartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};
