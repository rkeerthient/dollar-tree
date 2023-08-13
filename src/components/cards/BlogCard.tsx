import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";

const BlogCard = ({ result }: CardProps<any>) => {
  const blog = result.rawData;
  const blogImage = blog.primaryPhoto;

  return (
    <div className="border flex flex-col gap-10">
      <div>{blogImage && <Image layout="fill" image={blogImage} />}</div>
      <div className="p-4 ">
        <p className="h-10">{blog.name}</p>
        <p className="text-gray-400 text-sm mt-2 font-semibold">
          Posted on - {blog.datePosted}
        </p>
        <div className="flex justify-between  h-56 mt-4">
          <div className="  text-sm">{blog.description}</div>
        </div>
        <a href={blog.landingPageUrl}>
          <div className="px-4 py-2 w-fit border-[#5da36e] border-2 mt-4 hover:cursor-pointer">
            Learn more
          </div>
        </a>
      </div>
    </div>
  );
};

export { BlogCard };
