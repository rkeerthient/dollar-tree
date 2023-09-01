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
import { dummyReviews } from "../components/data.js";

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
    sku,
  } = document;
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <PageLayout _site={_site} templateData={{ __meta, document }}>
        <div className="centered-container">
          <div className="section">
            <div className="bg-white">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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
                      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
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
                      {/* <p className="text-2xl tracking-tight text-gray-900 font-bold">
                        <span className="text-base">$</span> {price.value}{" "}
                        <span className="text-base font-light">each</span>
                      </p> */}
                      <div className="text-2xl font-bold">
                        <span className="text-base font-light align-top">
                          $
                        </span>
                        {price.value}{" "}
                        <span className="text-base font-light mb-auto">
                          each
                        </span>
                      </div>
                    </div>
                    <hr className="my-3" />
                    {c_sets ? (
                      <Dropdown price={price.value} sets={c_sets}></Dropdown>
                    ) : (
                      <div>
                        <span className="text-base font-light align-top">
                          $
                        </span>
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
                          className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-400 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full uppercase"
                        >
                          <div>Add to bag</div>
                        </button>
                      </div>
                    </form>
                    <section
                      aria-labelledby="details-heading"
                      className="mt-12"
                    >
                      <h2 id="details-heading" className="sr-only">
                        Additional details
                      </h2>
                    </section>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>
                  <RTF>{c_richTextDescription}</RTF>
                </div>
                <hr className="my-4" />
                <div className="mt-4">
                  {dummyReviews.reviews.map((item: any, index: number) => (
                    <div
                      key={index}
                      style={{
                        padding: "2em",
                        borderBottom: " 1px solid gray",
                      }}
                    >
                      <div
                        className="flex"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div>{item.user}</div>
                        <div>{item.date}</div>
                      </div>
                      <div className="ml-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              c_rating > item.rating
                                ? "text-green-500"
                                : "text-gray-200",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <div style={{ fontSize: `1.5em`, fontWeight: "400" }}>
                        {item.title}
                      </div>
                      <div style={{ color: "#6f6f6f" }}>{item.comment}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Product;
