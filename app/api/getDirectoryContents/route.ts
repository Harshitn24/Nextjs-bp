import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../utils/mongodb';
import { Directory } from '../../../models/Directory';
import { File } from '../../../models/File';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
        const client = await clientPromise;
        const db = client.db('file-manager');

        const directories = await db.collection('directories').find({}).toArray();
        const files = await db.collection('files').find({}).toArray();

        res.status(200).json({ directories, files });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch directory contents' });
    }
}
