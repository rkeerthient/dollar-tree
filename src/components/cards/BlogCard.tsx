import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";

const BlogCard = ({ result }: CardProps<any>) => {
  const blog = result.rawData;
  const blogImage = blog.primaryPhoto;

  return (
    <div className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        <img
          src={blogImage.image.url}
          alt=""
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={blog.datePosted} className="text-gray-500">
            {blog.datePosted}
          </time>
          <span
           
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {blog.c_blogsCategory}
          </span>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a href={blog.landingPageUrl}>
              <span className="absolute inset-0" />
              {blog.name}
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {blog.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export { BlogCard };
