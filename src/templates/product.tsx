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
      "photoGallery",
      "c_richTextDescription",
      "slug",
      "price",
      "color"
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
  } = document;
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
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
                    {photoGallery.length >= 2 && <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                      <Tab.List className="grid grid-cols-4 gap-6">
                        {photoGallery.map((image) => (
                          <Tab
                            key={image.image.url}
                            className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                          >
                            {({ selected }) => (
                              <>
                                <span className="sr-only">{image.name}</span>
                                <span className="absolute inset-0 overflow-hidden rounded-md">
                                  <img src={image.image.url} alt="" className="h-full w-full object-cover object-center" />
                                </span>
                                <span
                                  className={classNames(
                                    selected ? 'ring-indigo-500' : 'ring-transparent',
                                    'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>}

                    <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                      {photoGallery.map((image) => (
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
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{name}</h1>

                    <div className="mt-3">
                      <h2 className="sr-only">Product information</h2>
                      <p className="text-3xl tracking-tight text-gray-900">{price.value}</p>
                    </div>
                    <form className="mt-6">
                      {/* Colors */}
                      <div>
                        <h3 className="text-sm text-gray-600">Color</h3>

                        {/* <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                          <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                          <span className="flex items-center space-x-3">
                            {product.colors.map((color) => (
                              <RadioGroup.Option
                                key={color.name}
                                value={color}
                                className={({ active, checked }) =>
                                  classNames(
                                    color.selectedColor,
                                    active && checked ? 'ring ring-offset-1' : '',
                                    !active && checked ? 'ring-2' : '',
                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                  )
                                }
                              >
                                <RadioGroup.Label as="span" className="sr-only">
                                  {color.name}
                                </RadioGroup.Label>
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    color.bgColor,
                                    'h-8 w-8 rounded-full border border-black border-opacity-10'
                                  )}
                                />
                              </RadioGroup.Option>
                            ))}
                          </span>
                        </RadioGroup> */}
                      </div>

                      <div className="mt-10 flex">
                        <button
                          type="submit"
                          className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                        >
                          Add to bag
                        </button>

                        <button
                          type="button"
                          className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                        >
                          <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                          <span className="sr-only">Add to favorites</span>
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
                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>
                  <RTF>{c_richTextDescription}</RTF>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout >
    </>
  );
};

export default Product;
