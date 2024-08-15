'use client'
import React from 'react';
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from './Cartcontext';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
    const { cartItemCount } = useCart();
    const { data: session } = useSession();

    return (
        <header className='z-[999] relative'>
            <motion.div className='fixed top-0 left-1/2 -translate-x h-[4.5rem] w-full rounded-none
                border-white border-opacity-40 bg-white bg-opacity-80
                shadow-black/[0.03] backdrop-blur-[0.5rem]
                sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full'
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}>
            </motion.div>

            <nav className='flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2
                py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0'>
                <ul className='flex w-[22rem] flex-wrap items-center gap-y-1 text-[0.9rem] font-medium 
                    text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5'>
                    {
                        links.map(link => (
                            <motion.li className="h-3/4 flex items-center justify-center" key={link.hash}
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}>
                                <Link className="flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition" href={link.hash}>
                                    {
                                        link.name === "Cart" ? (
                                            <div className="relative flex items-center">
                                                <motion.div
                                                    key={cartItemCount} // Triggers re-animation on cart item count change
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <FaShoppingCart size={20} />
                                                </motion.div>
                                                {
                                                    cartItemCount > 0 && (
                                                        <motion.span
                                                            className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                                                            animate={{ scale: [1, 1.2, 1] }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            {cartItemCount}
                                                        </motion.span>
                                                    )
                                                }
                                            </div>
                                        ) : link.name === "Sign In" ? (
                                            session ? (
                                                <button onClick={() => signOut()} className="flex items-center">
                                                    Sign Out
                                                </button>
                                            ) : (
                                                <button onClick={() => signIn('google')} className="flex items-center">
                                                    Sign In
                                                </button>
                                            )
                                        ) : (
                                            link.name
                                        )
                                    }
                                </Link>
                            </motion.li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    )
}