import { ObjectId } from 'mongodb';

export interface Directory {
    _id: ObjectId;
    name: string;
    parentId: ObjectId | null;
}

export const directorySchema = {
    name: String,
    parentId: { type: ObjectId, default: null },
};
