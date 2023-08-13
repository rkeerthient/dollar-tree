import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";

const BlogCard = ({ result }: CardProps<any>) => {
  const blog = result.rawData;
  const blogImage = blog.primaryPhoto;

  return (
    <div className="p-4 border flex flex-col gap-4">
      <div>
        {/* {blogImage && <Image layout="fill" height={288} image={blogImage} />} */}
        <img
          src="https://a.mktgcdn.com/p/gvqBKK5QpQo986jmsHdNXZ0EjXJrogkEIBFd1Uc2NGY/600x314.jpg"
          alt=""
        />
      </div>
      <div className="pl-1">
        <p className="text-[#5da36e]">DIY Craft Stick Picture Frame Idea</p>
        <div className="text-gray-400 text-sm my-4">Posted - 08/04/2033</div>
        <div className="flex justify-between items-center mt-4 h-72">
          As a new school year approaches, teachers will be preparing classrooms
          with fun decorations, lesson plans, and more! This DIY craft stick
          picture frame is an easy classroom craft for teachers to make for
          their students, or even for students to make themselves at school.
          Wouldn’t these school bus frames be an inspiring classroom craft to
          display after picture day?
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
