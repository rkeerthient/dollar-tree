import * as React from "react";
import PageLayout from "../components/PageLayout";
// import Favicon from "../public/yext-favicon.ico";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { Tab } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import * as classNames from "classnames";
import RTF from "../components/RTF";
import { StarIcon } from "@heroicons/react/20/solid";
import Dropdown from "../components/Dropdown";
import Radio from "../components/Radio";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { dummyReviews } from "../components/data.js";
import { BsFillCartFill } from "react-icons/bs";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "products",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_rating",
      "c_noOfVotes",
      "photoGallery",
      "c_richTextDescription",
      "slug",
      "price",
      "color",
      "sku",
      "c_sets",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "c_productCategory1",
      "c_productCategory2",
      "c_productCategory3",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["product"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Product: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    photoGallery,
    c_richTextDescription,
    slug,
    price,
    color,
    __meta,
    c_rating,
    c_noOfVotes,
    c_sets,
    dm_directoryParents,
    c_productCategory1,
    c_productCategory2,
    c_productCategory3,
    sku,
  } = document;

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const breadcrumbs = dm_directoryParents
    ? dm_directoryParents?.map((parent: any) => {
        return {
          name: parent.name,
          href: parent.slug,
        };
      })
    : [
        {
          name: "Home",
          href: "root.html",
        },
        {
          name: c_productCategory1,
        },
        {
          name: c_productCategory2,
        },
      ];
  return (
    <>
      <PageLayout _site={_site} templateData={{ __meta, document }}>
        <div className="centered-container">
          <Breadcrumbs
            links={
              breadcrumbs && breadcrumbs.length >= 1
                ? [...breadcrumbs, { name: name }]
                : breadcrumbs
            }
          />
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                <Tab.Group as="div" className="flex flex-col-reverse">
                  {photoGallery && photoGallery.length >= 2 && (
                    <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                      <Tab.List className="flex gap-4">
                        {photoGallery.map((image: any) => (
                          <Tab
                            key={image.image.url}
                            className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                          >
                            {({ selected }) => (
                              <>
                                <span className="sr-only">{image.name}</span>
                                <span className="absolute inset-0 overflow-hidden rounded-md">
                                  <img
                                    src={image.image.url}
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                  />
                                </span>
                                <span
                                  className={classNames(
                                    selected
                                      ? "ring-indigo-500"
                                      : "ring-transparent",
                                    "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                  )}

                  <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                    {photoGallery &&
                      photoGallery.map((image: any) => (
                        <Tab.Panel key={image.id}>
                          <img
                            src={image.image.url}
                            alt={image.alt}
                            className="h-full w-full object-cover object-center sm:rounded-lg"
                          />
                        </Tab.Panel>
                      ))}
                  </Tab.Panels>
                </Tab.Group>

                {/* Product info */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <div className="space-y-4">
                    <h1 className="text-2xl font-normal tracking-tight text-gray-900">
                      {name}
                    </h1>
                    <div> SKU: {sku}</div>
                    <div className="ml-1 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            c_rating > rating
                              ? "text-green-500"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}{" "}
                      <div>{c_rating}</div> <div>({c_noOfVotes})</div>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div className="mt-3">
                    <h2 className="sr-only">Product information</h2>
                    <div className="text-2xl font-bold">
                      <span className="text-base font-light align-top">$</span>
                      {price.value}{" "}
                      <span className="text-base font-light mb-auto">each</span>
                    </div>
                  </div>
                  <hr className="my-3" />
                  {c_sets ? (
                    <Dropdown price={price.value} sets={c_sets}></Dropdown>
                  ) : (
                    <div>
                      <span className="text-base font-light align-top">$</span>
                      {price.value}
                      <span className="text-base font-light mb-auto">
                        Total
                      </span>
                    </div>
                  )}
                  <hr className="my-3" />
                  <Radio></Radio>
                  <hr className="my-3" />
                  <form className="mt-6">
                    <div className="mt-10 flex">
                      <button
                        type="submit"
                        className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-[#1e62c1] px-8 py-3  font-medium text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full uppercase gap-6 text-lg"
                      >
                        <div>Add to bag</div>
                        <BsFillCartFill />
                      </button>
                    </div>
                  </form>
                  <section aria-labelledby="details-heading" className="mt-12">
                    <h2 id="details-heading" className="sr-only">
                      Additional details
                    </h2>
                  </section>
                </div>
              </div>
              <hr className="my-4" />
              <div className="my-6">
                <h3 className="text-[#198641] font-bold text-xl">
                  Product Details
                </h3>
                {c_richTextDescription && (
                  <div className="text-sm">
                    <RTF>
                      {c_richTextDescription.includes("Specifications")
                        ? c_richTextDescription.replace(
                            "Specifications",
                            "\n **Specifications**\n"
                          )
                        : c_richTextDescription}
                    </RTF>
                  </div>
                )}
              </div>
              <h3 className="text-[#198641] font-bold text-xl">
                Rating & Reviews
              </h3>
              <hr className="my-4" />
              <div className="mt-4">
                {dummyReviews.reviews.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="px-8 py-3 border-b border-gray-600 text-sm"
                    style={{
                      padding: "2em",
                      borderBottom: " 1px solid gray",
                    }}
                  >
                    <div className=" flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            item.rating > rating
                              ? "text-[#198641]"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <div className="space-y-3 mt-3">
                      <div
                        className="flex"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div className=" font-semibold">{item.user}</div>
                        <div>{item.date}</div>
                      </div>
                      <div className="text-xl font-semibold">{item.title}</div>
                      <div>{item.comment}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Product;
