import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { products, userId, finalPrice, address } = await req.json();

        console.log('Request Data:', { products, userId, finalPrice, address });

        // Validate request data
        if (!products || !Array.isArray(products) || products.length === 0) {
            return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
        }

        if (!userId || !finalPrice || !address) {
            return NextResponse.json({ error: 'Missing user ID, final price, or address' }, { status: 400 });
        }

        // Convert product IDs to strings
        const productIds = products.map((product: any) => String(product.id));

        // Fetch the product details from the database
        const dbProducts = await db.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
            select: {
                id: true,
                price: true,
            },
        });

        console.log('Database Products:', dbProducts);

    

        // Create an order in the database
        const order = await db.order.create({
            data: {
                userId,
                total: finalPrice, // Store final price
                createdAt: new Date(), // Ensure timestamp is set
                orderItems: {
                    create: products.map((product: any) => ({
                        productId: product.id,
                        quantity: product.quantity,
                        price: product.price,
                    })),
                },
            },
        });

        console.log('Order Created:', order);

        return NextResponse.json({ message: 'Order stored successfully', order }, { status: 200 });
    } catch (error) {
        console.error('Error storing order:', error);
        return NextResponse.json({ error: 'Failed to store order' }, { status: 500 });
    }
}
