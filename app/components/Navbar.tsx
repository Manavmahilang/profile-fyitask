'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaShoppingCart, FaHome, FaUserCircle } from 'react-icons/fa';
import { signIn, signOut, useSession } from 'next-auth/react';
import { IoIosLogIn } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';

interface Link {
    name: string;
    hash: string;
}

const links: Link[] = [
    { name: "Home", hash: "/" },
    { name: "Cart", hash: "/Cart" },
    { name: "Sign In", hash: "" }
];

export default function Header() {
    const [cartItemCount, setCartItemCount] = useState<number>(0);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const { data: session } = useSession();

    useEffect(() => {
        const updateCartItemCount = () => {
            const cartStorage: { quantity: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');
            const totalItems = cartStorage.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
            setCartItemCount(totalItems);
        };

        // Update count on mount
        updateCartItemCount();

        // Regularly check for updates in localStorage
        const intervalId = setInterval(updateCartItemCount, 500);

        // Cleanup the interval on unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className='z-[999] relative'>
            <motion.div className='fixed top-0 left-1/2 -translate-x h-[4.5rem] w-full rounded-none
                border-white border-opacity-40 bg-white bg-opacity-10
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
                            <motion.li className="h-3/4 flex items-center justify-center relative" key={link.hash}
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}>
                                <Link className="flex w-full items-center justify-center px-3 py-3 " href={link.hash}>
                                    {
                                        link.name === "Cart" ? (
                                            <div className="relative flex items-center">
                                                <motion.div
                                                    key={cartItemCount} // Triggers re-animation on cart item count change
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <FaShoppingCart size={20} className='hover:text-gold transition' />
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
                                        ) : link.name === "Home" ? (
                                            <FaHome size={20} className='hover:text-gold transition' />
                                        ) : link.name === "Sign In" ? (
                                            session ? (
                                                <div className="relative">
                                                    <FaUserCircle size={20} onClick={handleDropdownToggle} />
                                                    {showDropdown && (
                                                        <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                                                            <button
                                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                                                                onClick={() => signOut()}
                                                            >
                                                                <BiLogOut size={20} className="mr-2" />
                                                                Sign Out
                                                            </button>
                                                            <Link href="/Account/Orders" className=" w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                                                                <FaUserCircle size={20} className="mr-2" />
                                                                Orders
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <button onClick={() => signIn('google')} className="flex items-center hover:text-gold transition">
                                                    <IoIosLogIn size={20} className="mr-2" />
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
    );
}
