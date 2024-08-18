'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import CartItemComponent from './CartItemComponent';
import DiscountSection from './DsicountSection';


interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const { data: session } = useSession();
    const router = useRouter();
    const [initialPrice, setInitialPrice] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);

    useEffect(() => {
        const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cartStorage);
        calculateFinalPrice(cartStorage, discount);
    }, [discount]);

    const calculateTotalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cartItems]);

    const calculateFinalPrice = (cartItems: CartItem[], discount: number) => {
        const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const discountAmount = discount; // The discount applied
        const newFinalPrice = totalPrice - discountAmount;
        setFinalPrice(newFinalPrice);
        setInitialPrice(totalPrice); // Store initial price for display
        setDiscountAmount(discountAmount); // Store discount amount for display
    };

    const applyDiscountCode = (code: string) => {
        let discountValue = 0;

        if (code === 'DISCOUNT10') {
            discountValue = 10;
            toast.success('🎉 Discount code applied successfully! 🎉');
        } else {
            toast.error('❌ Invalid discount code. Please use DISCOUNT10 ❌');
            return;
        }

        setDiscount(discountValue);
        // Call calculateFinalPrice after updating the discount state
        calculateFinalPrice(cartItems, discountValue);
    };

    const updateItemQuantity = (id: number, quantity: number) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateFinalPrice(updatedCart, discount);
    };

    const removeItemFromCart = (id: number) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateFinalPrice(updatedCart, discount);
    };

    const handleCheckout = async () => {
        if (session) {
            try {
                // Send order confirmation email
                const response = await fetch('/api/sendOrderConfirmation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: session.user?.email }),
                });

                if (response.ok) {
                    // Store the order in the database
                    const orderPayload = {
                        userId: session.user?.id,
                        products: cartItems.map(item => ({
                            id: item.id,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                        finalPrice: finalPrice, // Ensure finalPrice is used here
                        address: 'User address here', // Replace with actual address input if needed
                    };

                    console.log('Order Payload:', orderPayload); // Log payload for debugging

                    const orderResponse = await fetch('/api/orders', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(orderPayload),
                    });

                    if (orderResponse.ok) {
                        // Empty the cart
                        setCartItems([]);
                        localStorage.removeItem('cart');

                        // Display confirmation message
                        toast.success('Order received, confirmation email sent');

                        // Redirect after 5 seconds
                        setTimeout(() => {
                            router.push('/');
                        }, 5000);
                    } else {
                        toast.error('Failed to store order details');
                    }
                } else {
                    toast.error('Failed to send confirmation email');
                }
            } catch (error) {
                toast.error('Failed to process order');
                console.error(error);
            }
        } else {
            signIn('google');
        }
    };

    const backgroundImage = 'url(/emptycart.jpg)';

    return (
        <div
            className="min-h-screen px-4 py-10 bg-gray-900 text-gray-100"
            style={{
                backgroundImage: backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-white pt-10">Your Cart</h1>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                <div className="lg:col-span-3">
                    <AnimatePresence>
                        {cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <CartItemComponent
                                    key={item.id}
                                    item={item}
                                    onUpdateQuantity={updateItemQuantity}
                                    onRemove={removeItemFromCart}
                                />
                            ))
                        ) : (
                            <p className="text-gray-400">Your cart is empty</p>
                        )}
                    </AnimatePresence>
                </div>
                <div className="lg:col-span-1">
                    <DiscountSection
                        discountCode={discountCode}
                        setDiscountCode={setDiscountCode}
                        applyDiscountCode={applyDiscountCode}
                        finalPrice={finalPrice}
                        initialPrice={initialPrice}
                        discountAmount={discountAmount}
                        handleCheckout={handleCheckout}
                    />
                </div>
            </div>
        </div>
    );
};

export default CartPage;
