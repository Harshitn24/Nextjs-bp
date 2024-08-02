import { ObjectId } from 'mongodb';

export interface File {
    _id: ObjectId;
    name: string;
    content: string;
    parentId: ObjectId | null;
}

export const fileSchema = {
    name: String,
    content: String,
    parentId: { type: ObjectId, default: null },
};
