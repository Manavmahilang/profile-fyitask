'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface DiscountSectionProps {
    discountCode: string;
    setDiscountCode: React.Dispatch<React.SetStateAction<string>>;
    applyDiscountCode: (code: string) => void;
    finalPrice: number;
    initialPrice: number;
    discountAmount: number;
    handleCheckout: () => void;
}

const DiscountSection = ({
    discountCode,
    setDiscountCode,
    applyDiscountCode,
    finalPrice,
    initialPrice,
    discountAmount,
    handleCheckout
}: DiscountSectionProps) => (
    <motion.div
        className="lg:col-span-1 lg:sticky lg:top-28"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 1 }} // 1 second delay
    >
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-100">Discount Code</h2>
            <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-gray-100"
                value={discountCode}
                placeholder='DISCOUNT10'
                onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button
                className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-500"
                onClick={() => applyDiscountCode(discountCode)}
            >
                Apply Discount
            </button>
            <div className="mt-6 text-gray-200">
                <p className="text-lg mb-2">Initial Price: <span className="font-semibold">${initialPrice.toFixed(2)}</span></p>
                <p className="text-lg mb-2">Discount Amount: <span className="font-semibold">${discountAmount.toFixed(2)}</span></p>
                <p className="text-xl font-bold">Final Price: <span className="font-semibold">${finalPrice.toFixed(2)}</span></p>
            </div>
            <button
                className="w-full mt-6 p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                onClick={handleCheckout}
            >
                Checkout
            </button>
        </div>
    </motion.div>
);

export default DiscountSection;
