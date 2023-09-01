import * as React from "react";
import { AiOutlineCaretRight } from "react-icons/ai";

export type Link = {
  name: string;
  href?: string;
};

type BreadcrumbsProps = {
  links?: Link[];
};

const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  React.useEffect(() => {}, []);
  return (
    <nav className="flex py-5" aria-label="Breadcrumb ">
      <ol role="list" className="flex items-center space-x-4 mb-4">
        {links?.map((link, idx) => (
          <li key={link.name}>
            <div className="flex items-center">
              {idx !== 0 && (
                <AiOutlineCaretRight className="h-3 w-3 flex-shrink-0  text-gray-500"></AiOutlineCaretRight>
              )}
              {link.href ? (
                <a
                  href={`/${link.href}`}
                  className="ml-4 text-xs font-medium   hover:underline text-[#198641]"
                >
                  {link.name}
                </a>
              ) : (
                <span className="ml-4 text-xs font-medium  text-[#198641]">
                  {link.name}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export { Breadcrumbs };
