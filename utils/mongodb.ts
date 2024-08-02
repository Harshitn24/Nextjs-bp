import { MongoClient } from 'mongodb';

const uri = process?.env?.MONGODB_URL || 'aaa';
const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {

    let globalClient: MongoClient | undefined = (global as any)._mongoClient;
    if (!globalClient) {
        globalClient = client;
        (global as any)._mongoClient = globalClient;
    }
    clientPromise = globalClient.connect();
} else {
    clientPromise = client.connect();
}

export default clientPromise;
