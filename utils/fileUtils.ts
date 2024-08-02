import { Directory, File } from '../types/types';

let directories: Directory[] = [
    { id: '1', name: 'Root', children: [] }
];

let files: File[] = [];

export const getDirectoryContents = async (): Promise<{ directories: Directory[]; files: File[] }> => {
    return { directories, files };
};

export const createDirectory = async (name: string, parentId: string): Promise<Directory> => {
    const newDir: Directory = { id: Date.now().toString(), name, children: [] };
    const parent = directories.find(dir => dir.id === parentId);
    if (parent) {
        parent.children.push(newDir);
        return newDir;
    }
    throw new Error('Parent directory not found');
};

export const createFile = async (name: string, content: string, parentId: string): Promise<File> => {
    const newFile: File = { id: Date.now().toString(), name, content };
    files.push(newFile);
    return newFile;
};

export const deleteItem = async (id: string): Promise<void> => {
    directories = directories.filter(dir => dir.id !== id);
    files = files.filter(file => file.id !== id);
};

export const renameItem = async (id: string, newName: string): Promise<Directory | File> => {
    const file = files.find(f => f.id === id);
    if (file) {
        file.name = newName;
        return file;
    }

    const dir = findAndRenameDirectory(directories, id, newName);
    if (dir) return dir;

    throw new Error('Item not found');
};

const findAndRenameDirectory = (dirs: Directory[], id: string, newName: string): Directory | null => {
    for (const dir of dirs) {
        if (dir.id === id) {
            dir.name = newName;
            return dir;
        }
        const result = findAndRenameDirectory(dir.children, id, newName);
        if (result) return result;
    }
    return null;
};
