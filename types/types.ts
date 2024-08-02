// types.ts

export interface Directory {
    id: string;
    name: string;
    children: Directory[];
}

export interface File {
    id: string;
    name: string;
    content: string;
}

export interface DirectoryContents {
    directories: Directory[];
    files: File[];
}
