'use client'
import React, { useEffect, useState } from 'react';

interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    productId: string;
    orderId: string;
}

interface Order {
    id: string;
    userId: string;
    total?: number; // Optional to handle missing values
    createdAt: string; // Adjust based on your schema
    orderItems: OrderItem[]; // Adjust based on your schema
}

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/AllOrders'); // Adjust API route if necessary
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data: Order[] = await response.json();
                setOrders(data);
            } catch (error) {
                setError('Failed to load orders');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    // Find the latest order
    const latestOrder = orders.length > 0 ? orders.reduce((prev, curr) =>
        new Date(prev.createdAt) > new Date(curr.createdAt) ? prev : curr
    ) : null;

    return (
        <div className="min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold mb-2">Your Orders</h1>
                    <p className="text-lg text-gray-600">
                        {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                    </p>
                </header>

                {latestOrder && (
                    <div className="bg-blue-100 p-6 rounded shadow mb-8">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-2">Latest Order</h2>
                        <div className="border-l-4 border-blue-500 pl-4">
                            <p><strong>Order ID:</strong> {latestOrder.id}</p>
                            <p><strong>User ID:</strong> {latestOrder.userId}</p>
                            <p>
                                <strong>Final Price:</strong> $
                                {latestOrder.total !== undefined && latestOrder.total !== null
                                    ? latestOrder.total.toFixed(2)
                                    : 'N/A'}
                            </p>
                            <p><strong>Order Date:</strong> {new Date(latestOrder.createdAt).toLocaleDateString()}</p>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">Products:</h3>
                                <ul className="list-disc list-inside">
                                    {latestOrder.orderItems.length > 0 ? (
                                        latestOrder.orderItems.map((item) => (
                                            <li key={item.id}>
                                                Product ID: {item.productId} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                                            </li>
                                        ))
                                    ) : (
                                        <li>No products found for this order</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white p-6 rounded shadow">
                            <h2 className="text-xl font-bold mb-2">Order #{order.id}</h2>
                            <p><strong>User ID:</strong> {order.userId}</p>
                            <p>
                                <strong>Final Price:</strong> $
                                {order.total !== undefined && order.total !== null
                                    ? order.total.toFixed(2)
                                    : 'N/A'}
                            </p>
                            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">Products:</h3>
                                <ul className="list-disc list-inside">
                                    {order.orderItems && order.orderItems.length > 0 ? (
                                        order.orderItems.map((item) => (
                                            <li key={item.id}>
                                                Product ID: {item.productId} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                                            </li>
                                        ))
                                    ) : (
                                        <li>No products found for this order</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
