'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative bg-black min-h-screen">
            {/* Shadow overlay with fixed position */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full z-10 bg-black shadow-[0_0_30px_10px_rgba(255,223,0,0.7)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                    opacity: 0,
                    transition: {
                        duration: 1,
                        ease: [0.76, 0, 0.24, 1]
                    }
                }}
            />
            
            {/* Main content with neo yellow shadow */}
            <motion.div
                className="relative z-20 bg-black shadow-neon-yellow"
                initial={{ scale: 1, y: 0, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{
                    scale: 0.9,
                    y: -150,
                    opacity: 0,
                    transition: {
                        duration: 1.2,
                        ease: [0.76, 0, 0.24, 1]
                    }
                }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5 } }}
                    exit={{ opacity: 0 }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    )
}
