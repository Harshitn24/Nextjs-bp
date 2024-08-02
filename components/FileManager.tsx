import React, { useState, useEffect } from 'react';
import DirectoryTree from './DirectoryTree';
import FileItem from './FileItem';
import { Directory, File, DirectoryContents } from '../types/types';

const FileManager: React.FC = () => {
    const [data, setData] = useState<DirectoryContents>({ directories: [], files: [] });
    const [selectedDir, setSelectedDir] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/getDirectoryContents')
            // .then((response) => response.json())
            // .then((data: DirectoryContents) => setData(data));
    }, []);

    const handleSelect = (dirId: string) => {
        setSelectedDir(dirId);
        // Implement additional fetch logic for the selected directory if needed
    };

    const createDirectory = async (name: string, parentId: string | null) => {
        try {
            const response = await fetch('/api/createDirectory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, parentId }),
            });

            const newDirectory = await response.json();
            setData(prevData => ({
            ...prevData,
            directories: [...prevData.directories, newDirectory],
            }));
        } catch (error) {
            console.error('Failed to create directory', error);
        }
        };

        const createFile = async (name: string, content: string, parentId: string | null) => {
            try {
              const response = await fetch('/api/createFile', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, content, parentId }),
              });
          
              const newFile = await response.json();
              setData(prevData => ({
                ...prevData,
                files: [...prevData.files, newFile],
              }));
            } catch (error) {
              console.error('Failed to create file', error);
            }
          };
          
        //   const deleteItem = async (id: string) => {
        //     try {
        //       await fetch('/api/deleteItem', {
        //         method: 'DELETE',
        //         headers: {
        //           'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ id }),
        //       });
          
        //       setData(prevData => ({
        //         directories: prevData.directories.filter(dir => dir._id !== id),
        //         files: prevData.files.filter(file => file._id !== id),
        //       }));
        //     } catch (error) {
        //       console.error('Failed to delete item', error);
        //     }
        //   };
        
        //     const renameItem = async (id: string, newName: string) => {
        //     try {
        //         await fetch('/api/renameItem', {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ id, newName }),
        //       });
          
        //       setData(prevData => ({
        //         ...prevData,
        //         directories: prevData.directories.map(dir =>
        //           dir._id === id ? { ...dir, name: newName } : dir
        //         ),
        //         files: prevData.files.map(file =>
        //           file._id === id ? { ...file, name: newName } : file
        //         ),
        //       }));
        //     } catch (error) {
        //       console.error('Failed to rename item', error);
        //     }
        //   };
          


    return (
        <div>
        <DirectoryTree directories= { data.directories } onSelect = { handleSelect } />
            <div>
            {
                data.files.map(file => (
                    <FileItem key= { file.id } file = { file } />
        ))
            }

            <button onClick = { () => createDirectory('New Directory', selectedDir) }>Create Directory</button>
            </div>
            </div>
    );
};

export default FileManager;
