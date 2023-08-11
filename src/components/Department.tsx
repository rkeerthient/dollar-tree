import * as React from "react";
import { useState } from "react";
import { DirectoryItem } from "./DepartmentsType";

interface TreeStructureProps {
    data: DirectoryItem[];
}
interface TreeNodeProps {
    label: string;
    children: React.ReactNode;
};
const Department = ({ data }: TreeStructureProps) => {
    return <div>{createTree(data)}</div>;

}

export default Department;


const createTree = (data: TreeStructureProps['data']) => {
    return data.map((item) => (
        <TreeNode key={item.slug} label={item.name}>
            {item.dm_directoryChildren && createTree(item.dm_directoryChildren)}
        </TreeNode>
    ));
};

const TreeNode = ({ label, children }: TreeNodeProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNode = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div
                className="cursor-pointer flex items-center"
                onClick={toggleNode}
            >
                {isOpen ? '🔽' : '▶️'} {label}
            </div>
            {isOpen && <div className="ml-5">{children}</div>}
        </div>
    );
};
