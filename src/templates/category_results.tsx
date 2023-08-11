import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TransformProps,
  TemplateConfig,
} from "@yext/pages";
import { FieldValueStaticFilter, Matcher } from "@yext/search-headless-react";
import PageLayout from "../components/PageLayout";
import ProductPage from "../pages/ProductPage";
import { Breadcrumbs } from "../components/Breadcrumbs";

export const config: TemplateConfig = {
  stream: {
    $id: "category-pages",
    fields: [
      "id",
      // "entityType",
      "name",
      "slug",
      "description",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug",
    ],
    filter: {
      entityTypes: ["ce_root", "ce_category2", "ce_category3", "ce_category1"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateRenderProps> = ({ document }) => {
  return `document.slug ?? document.name`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: `Dollar tree | Products`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const CategoryResults: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site, meta, name, description, dm_directoryChildren } = document;
  const entityType = meta.entityType.id;

  const getFieldId = () => {
    if (entityType === "ce_category1") {
      return "c_productCategory1";
    } else if (entityType === "ce_category2") {
      return "c_productCategory2";
    } else {
      return "c_productCategory3";
    }
  };

  const initialFilter: FieldValueStaticFilter = {
    kind: "fieldValue",
    fieldId: getFieldId(),
    matcher: Matcher.Equals,
    value: name,
  };

  const breadcrumbs = document.dm_directoryParents?.map((parent: any) => {
    return {
      name: parent.name,
      href: parent.slug,
      current: false,
    };
  });

  const subCategoryLinks = document.dm_directoryChildren
    ?.slice(1)
    .map((child: any) => {
      return {
        name: child.name,
        href: child.slug,
      };
    });

  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <Breadcrumbs links={breadcrumbs}></Breadcrumbs>
          <ProductPage
            subCatrgories={
              entityType !== "ce_category3" ? dm_directoryChildren : undefined
            }
            initialFilter={entityType !== "ce_root" ? initialFilter : undefined}
            selectedFilter={getFieldId()}
            breadcrumbLinks={breadcrumbs ? [...breadcrumbs, { name }] : []}
          />
        </div>
      </PageLayout>
    </>
  );
};

export default CategoryResults;
