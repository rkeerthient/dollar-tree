import * as React from "react";
import { useState } from "react";
import { DirectoryItem } from "./DepartmentsType";

interface TreeStructureProps {
  data: DirectoryItem[];
}
interface TreeNodeProps {
  label: string;
  children: React.ReactNode;
  slug: string;
}
const Department = ({ data }: TreeStructureProps) => {
  return <div>{createTree(data)}</div>;
};

export default Department;

const createTree = (data: DirectoryItem[]) => {
  return data.map((item) => (
    <TreeNode key={item.slug} label={item.name} slug={item.slug}>
      {item.dm_directoryChildren && createTree(item.dm_directoryChildren)}
    </TreeNode>
  ));
};

const TreeNode = ({ label, children, slug }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNode = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex gap-2 items-center">
        <div className="cursor-pointer flex items-center" onClick={toggleNode}>
          {isOpen ? "🔽" : "▶️"}{" "}
        </div>
        <a href={`/${slug}`}>{label}</a>
      </div>

      {isOpen && <div className="ml-5">{children}</div>}
    </div>
  );
};
