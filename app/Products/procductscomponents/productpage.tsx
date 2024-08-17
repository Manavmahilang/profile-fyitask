'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';


import product1Image from '/public/1.jpg';
import product2Image from '/public/2.jpg';
import product3Image from '/public/3.jpg';
import product4Image from '/public/4.jpg';
import product5Image from '/public/5.jpg';
import product6Image from '/public/6.jpg';
import product7Image from '/public/7.jpg';
import product8Image from '/public/8.jpg';
import product9Image from '/public/9.jpg';
import product10Image from '/public/10.jpg';
import product11Image from '/public/11.jpg';
import product12Image from '/public/12.jpg';
import Navbar from '@/app/components/Navbar';

const products = [
    { id: 1, name: 'Product 1', price: '$20.00', image: product1Image },
    { id: 2, name: 'Product 2', price: '$25.00', image: product2Image },
    { id: 3, name: 'Product 3', price: '$30.00', image: product3Image },
    { id: 4, name: 'Product 4', price: '$20.00', image: product4Image },
    { id: 5, name: 'Product 5', price: '$25.00', image: product5Image },
    { id: 6, name: 'Product 6', price: '$30.00', image: product6Image },
    { id: 7, name: 'Product 7', price: '$20.00', image: product7Image },
    { id: 8, name: 'Product 8', price: '$25.00', image: product8Image },
    { id: 9, name: 'Product 9', price: '$30.00', image: product9Image },
    { id: 10, name: 'Product 10', price: '$20.00', image: product10Image },
    { id: 11, name: 'Product 11', price: '$25.00', image: product11Image },
    { id: 12, name: 'Product 12', price: '$30.00', image: product12Image },
]

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const ProductsPage: React.FC = () => {
    const [cartData, setCartData] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItemIndex = cartStorage.findIndex((cartItem: CartItem) => cartItem.id === item.id);

        if (existingItemIndex >= 0) {
            // If item exists, increase quantity
            cartStorage[existingItemIndex].quantity += item.quantity;
        } else {
            // If item doesn't exist, add it to the cart
            cartStorage.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cartStorage));
        setCartData(cartStorage); // Update state with the latest cart data
    };

    return (
        <>
            <Navbar />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: -50 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1,
                            when: "beforeChildren",
                            staggerChildren: 0.2,
                        },
                    },
                }}
                className="min-h-screen bg-gray-100 p-10"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-20">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={{
                                hidden: { opacity: 0, y: -50 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="bg-white p-6 rounded-lg shadow-lg"
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={500}
                                height={300}
                                className="w-full h-80 object-cover mb-4 rounded"
                                placeholder="blur"
                            />
                            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-700 mb-4">{product.price}</p>
                            <button
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                onClick={() => addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: parseFloat(product.price.replace('$', '')),
                                    image: product.image.src,
                                    quantity: 1,
                                })}
                            >
                                Add to Cart
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default ProductsPage;
