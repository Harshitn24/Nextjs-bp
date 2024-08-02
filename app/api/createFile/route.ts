import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

interface CreateFileRequest {
    name: string;
    content: string;
    parentId: string | null;
}

async function handler(req: NextApiRequest, res: NextResponse) {
    const { name, content, parentId }: CreateFileRequest = req.body;

    try {
        const client = await clientPromise;
        const db = client.db('file-manager');

        const result = await db.collection('files').insertOne({
            name,
            content,
            parentId: parentId ? new ObjectId(parentId) : null,
        });
        console.log(result);
        NextResponse.json(result);
    } catch (error) {
        NextResponse.json({ error: 'Failed to create file' });
    }
}

export { handler as GET, handler as POST }
