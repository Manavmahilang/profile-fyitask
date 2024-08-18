'use client';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const CartItemComponent = ({
    item,
    onUpdateQuantity,
    onRemove
}: {
    item: CartItem;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
}) => (
    <motion.div
        key={item.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.6, delay: 1 }} // 1 second delay
        className="flex items-center bg-gray-800 p-4 rounded-lg shadow-lg mb-4 hover:shadow-xl transition-shadow duration-300"
    >
        <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded" />
        <div className="ml-4 flex-grow">
            <h2 className="text-lg font-semibold text-gray-200">{item.name}</h2>
            <p className="text-gray-400">${item.price}</p>
        </div>
        <div className="flex items-center justify-center mt-2">
            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 bg-gray-700 text-gray-100 rounded-l hover:bg-gray-600">
                -
            </button>
            <span className="mx-2 text-gray-200">{item.quantity}</span>
            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-700 text-gray-100 rounded-r hover:bg-gray-600">
                +
            </button>
        </div>
        <button
            className="ml-6 text-red-400 hover:text-red-300"
            onClick={() => onRemove(item.id)}
        >
            <FaTrashAlt />
        </button>
    </motion.div>
);

export default CartItemComponent;
