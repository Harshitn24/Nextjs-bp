import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

interface RenameItemRequest {
    id: string;
    newName: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { id, newName }: RenameItemRequest = req.body;

    try {
        const client = await clientPromise;
        const db = client.db('file-manager');

        const updateResult = await db.collection('files').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name: newName } }
        );

        if (updateResult.matchedCount === 0) {
            await db.collection('directories').updateOne(
                { _id: new ObjectId(id) },
                { $set: { name: newName } }
            );
        }

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to rename item' });
    }
}
