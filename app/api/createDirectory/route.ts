import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

interface CreateDirectoryRequest {
    name: string;
    parentId: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { name, parentId }: CreateDirectoryRequest = req.body;

    try {
        const client = await clientPromise;
        const db = client.db('file-manager');

        const result = await db.collection('directories').insertOne({
            name,
            parentId: parentId ? new ObjectId(parentId) : null,
        });

        console.log(result);
        // res.status(200).json(result.ops[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create directory' });
    }
}
