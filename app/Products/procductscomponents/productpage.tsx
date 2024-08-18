'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartData, setCartData] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/Product');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const addToCart = (item: CartItem) => {
        const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItemIndex = cartStorage.findIndex((cartItem: CartItem) => cartItem.id === item.id);

        if (existingItemIndex >= 0) {
            cartStorage[existingItemIndex].quantity += item.quantity;
        } else {
            cartStorage.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cartStorage));
        setCartData(cartStorage);
    };

    return (
        <>
            <Navbar />
            <div className="relative min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    className="fixed top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source src="/2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

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
                    className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 pt-32"
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={{
                                hidden: { opacity: 0, y: -50 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="bg-white p-4 sm:p-6 rounded-lg hover:shadow-xl shadow-neon-yellow transition-shadow duration-300"
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={500}
                                height={300}
                                className="w-full h-48 sm:h-60 object-cover mb-4 rounded"
                            />
                            <h2 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">{product.name}</h2>
                            <p className="text-gray-600 mb-4">{`$${product.price.toFixed(2)}`}</p>
                            <button
                                className="w-full bg-gold text-white py-2 rounded hover:shadow-neon-yellow transition-colors duration-300"
                                onClick={() => addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.image,
                                    quantity: 1,
                                })}
                            >
                                Add to Cart
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    );
};

export default ProductsPage;