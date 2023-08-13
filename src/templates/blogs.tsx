/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/PageLayout";
import BlogsPage from "../pages/BlogsPage";

export const config: TemplateConfig = {
  name: "blogs",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `blogs`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Dollar tree | FAQs",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const BlogsWrapper: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <BlogsPage />
        </div>
      </PageLayout>
    </>
  );
};
export default BlogsWrapper;
