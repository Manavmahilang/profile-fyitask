import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const products = await db.product.findMany(); // Adjust to match your schema
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}