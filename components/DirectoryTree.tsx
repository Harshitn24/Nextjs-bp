import React from "react";
import { Directory } from "../types/types";

interface DirectoryTreeProps {
  directories: Directory[];
  onSelect: (id: string) => void;
}

const DirectoryTree: React.FC<DirectoryTreeProps> = ({
  directories,
  onSelect,
}) => {
  return (
    <div>
      {directories.map((dir) => (
        <div key={dir.id}>
          <span onClick={() => onSelect(dir.id)}>{dir.name}</span>
          {dir.children.length > 0 && (
            <DirectoryTree directories={dir.children} onSelect={onSelect} />
          )}
        </div>
      ))}
    </div>
  );
};

export default DirectoryTree;
