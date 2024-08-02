import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

interface DeleteItemRequest {
    id: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { id }: DeleteItemRequest = req.body;

    try {
        const client = await clientPromise;
        const db = client.db('file-manager');

        await db.collection('directories').deleteOne({ _id: new ObjectId(id) });
        await db.collection('files').deleteOne({ _id: new ObjectId(id) });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
}
