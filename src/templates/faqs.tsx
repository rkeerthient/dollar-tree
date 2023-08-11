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
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import FAQsPage from "../pages/FAQsPage";

export const config: TemplateConfig = {
  name: "faqs",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `faqs`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Centrum | FAQs",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const FAQsWrapper: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <FAQsPage />
        </div>
      </PageLayout>
    </>
  );
};
export default FAQsWrapper;
