import * as React from "react";
import { useState } from "react";
import { DirectoryItem } from "./DepartmentsType";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";

interface TreeStructureProps {
  data: DirectoryItem[];
}

interface TreeNodeProps {
  label: string;
  children: React.ReactNode;
  slug: string;
  count: number;
  hasChildren: boolean;
  hasProductChildren: boolean;
}

const Department = ({ data }: TreeStructureProps) => {
 
  return <div className="space-y-2">{createTree(data)}</div>;
};

export default Department;

const createTree = (data: DirectoryItem[]) => {
  return data.map((item) => (
    <TreeNode
      key={item.slug}
      label={item.name}
      slug={item.slug}
      count={item.dm_directoryChildren ? item.dm_directoryChildren.length : 0}
      hasChildren={
        item.dm_directoryChildren && item.dm_directoryChildren.length > 0
      }
      hasProductChildren={hasProductChildren(item.dm_directoryChildren)}
    >
      {item.dm_directoryChildren && createTree(item.dm_directoryChildren)}
    </TreeNode>
  ));
};

const TreeNode = ({
  label,
  children,
  slug,
  count,
  hasChildren,
  hasProductChildren,
}: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNode = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div className="flex gap-2 items-center">
        {hasChildren && !hasProductChildren && (
          <div
            className="cursor-pointer flex items-center"
            onClick={toggleNode}
          >
            {isOpen ? <BiChevronDown /> : <BiChevronRight />}
          </div>
        )}
        <a href={`/${slug}`} className="hover:underline">
          {label}
        </a>
        {/* {hasChildren && <span>({count})</span>} */}
      </div>

      {isOpen && <div className="ml-5 text-sm pl-2">{children}</div>}
    </div>
  );
};

const hasProductChildren = (children: DirectoryItem[] | undefined): boolean => {
  if (!children) {
    return false;
  }
  return children.some((child) => child.slug.includes("products"));
};
