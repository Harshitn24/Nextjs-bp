import React from 'react';
import { File } from '../types/types';

interface FileItemProps {
    file: File;
}

const FileItem: React.FC<FileItemProps> = ({ file }) => {
    return (
        <div>
        <span>{ file.name } </span>
        </div>
    );
};

export default FileItem;
