'use client'
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useCart } from '../../components/Cartcontext';

const Cart = () => {
    const { cartItems, addItemToCart, removeItemFromCart, updateItemQuantity, calculateTotalPrice, discount, finalPrice } = useCart();

    return (
        <div className="flex justify-between p-10 pt-20">
            <div className="w-3/5">
                <h2 className="text-2xl font-semibold mb-5">Shopping Cart</h2>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b py-5">
                            <div className="flex items-center">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                                <div>
                                    <h3 className="text-lg font-medium">{item.name}</h3>
                                    <p className="text-sm text-gray-500">${item.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded">-</button>
                                <input type="number" value={item.quantity} onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))} className="mx-2 w-12 text-center border rounded" />
                                <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
                                <button onClick={() => removeItemFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>

            <div className="w-1/3 ml-10 p-5 bg-gray-100 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-5">Discount & Total</h3>
                <div className="mb-5">
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount Code</label>
                    <input type="text" id="discount" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2" />
                    <button  className="mt-3 w-full bg-blue-500 text-white py-2 rounded">Apply</button>
                </div>
                <div className="border-t border-gray-300 py-3">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${calculateTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-2">
                        <span>Final Price</span>
                        <span>${finalPrice.toFixed(2)}</span>
                    </div>
                    <button  className="mt-5 w-full bg-green-500 text-white py-2 rounded">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
