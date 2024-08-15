'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/app/components/Cartcontext';

const products = [
    {
        id: 1,
        name: 'Product 1',
        price: '$20.00',
        image: '/images/product1.jpg',
    },
    {
        id: 2,
        name: 'Product 2',
        price: '$25.00',
        image: '/images/product2.jpg',
    },
    {
        id: 3,
        name: 'Product 3',
        price: '$30.00',
        image: '/images/product3.jpg',
    },
    {
        id: 4,
        name: 'Product 1',
        price: '$20.00',
        image: '/images/product1.jpg',
    },
    {
        id: 5,
        name: 'Product 2',
        price: '$25.00',
        image: '/images/product2.jpg',
    },
    {
        id: 6,
        name: 'Product 3',
        price: '$30.00',
        image: '/images/product3.jpg',
    },
    {
        id: 7,
        name: 'Product 1',
        price: '$20.00',
        image: '/images/product1.jpg',
    },
    {
        id: 8,
        name: 'Product 2',
        price: '$25.00',
        image: '/images/product2.jpg',
    },
    {
        id: 9,
        name: 'Product 3',
        price: '$30.00',
        image: '/images/product3.jpg',
    },
    {
        id: 10,
        name: 'Product 1',
        price: '$20.00',
        image: '/images/product1.jpg',
    },
    {
        id: 11,
        name: 'Product 2',
        price: '$25.00',
        image: '/images/product2.jpg',
    },
    {
        id: 12,
        name: 'Product 3',
        price: '$30.00',
        image: '/images/product3.jpg',
    },
    // Add more products as needed
];

const containerVariants = {
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
};

const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
};

const ProductsPage: React.FC = () => {
    const { addItemToCart } = useCart();

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gray-100 p-10"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-20">
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        variants={itemVariants}
                        className="bg-white p-6 rounded-lg shadow-lg"
                    >
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-700 mb-4">${product.price}</p>
                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            onClick={() => addItemToCart({ 
                                id: product.id,
                                name: product.name,
                                price: parseFloat(product.price), // Convert string price to number
                                image: product.image,
                                quantity: 1 
                            })}
                        >
                            Add to Cart
                        </button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ProductsPage;