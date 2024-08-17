'use client';
import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { sendOrderConfirmationEmail } from '@/lib/mail';


interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cartStorage);
        calculateFinalPrice(cartStorage);
    }, []);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateFinalPrice = (cartItems: CartItem[]) => {
        const totalPrice = calculateTotalPrice();
        setFinalPrice(totalPrice - discount);
    };

    const applyDiscountCode = (code: string) => {
        if (code === 'DISCOUNT10') {
            setDiscount(10);
        } else {
            setDiscount(0);
        }
        calculateFinalPrice(cartItems);
    };

    const updateItemQuantity = (id: number, quantity: number) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateFinalPrice(updatedCart);
    };

    const removeItemFromCart = (id: number) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateFinalPrice(updatedCart);
    };

    const handleCheckout = async () => {
        if (session) {
            try {
                // Send confirmation email
                await sendOrderConfirmationEmail('manavmahilang78@gmail.com');

                // Show toast notification
                toast.success('Order received, Confirmation email sent');

                // Proceed to checkout
                router.push('/checkout');
            } catch (error) {
                toast.error('Failed to send confirmation email');
                console.error(error);
            }
        } else {
            signIn('google');
        }
    };

    return (
        <div className="min-h-screen px-10 pt-40 bg-gray-100">
            <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                <div className="lg:col-span-3">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="ml-4 flex-grow">
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p className="text-gray-700">${item.price}</p>
                                    <div className="flex items-center mt-2">
                                        <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <button
                                    className="ml-auto text-red-500 hover:text-red-700"
                                    onClick={() => removeItemFromCart(item.id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </div>
                <div className="lg:col-span-1 lg:sticky lg:top-28">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Discount Code</h2>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded mb-4"
                            onClick={() => applyDiscountCode(discountCode)}
                        >
                            Apply
                        </button>
                        <div className="flex justify-between text-gray-700 mb-2">
                            <span>Total Price</span>
                            <span>${calculateTotalPrice()}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 mb-2">
                            <span>Discount</span>
                            <span>${discount}</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold">
                            <span>Final Price</span>
                            <span>${finalPrice}</span>
                        </div>
                        <button
                            className="w-full bg-green-500 text-white py-2 rounded mt-4"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
