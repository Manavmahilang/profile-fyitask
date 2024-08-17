import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Follow Us</h2>
                    <div className="flex justify-center mt-3 space-x-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                            <FaTwitter size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                            <FaInstagram size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                            <FaLinkedinIn size={20} />
                        </a>
                    </div>
                </div>
                <div className="text-sm text-gray-400 mt-4">
                    <p>&copy; {new Date().getFullYear()} Tshirts by Manav. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
