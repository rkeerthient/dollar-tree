import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Cta from "../cta";

const PromoCard = ({ result }: CardProps<any>) => {
  const promo = result.rawData;
  const promoImage = promo.photoGallery?.[0];

  return (
    <>
      <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
        <article className="relative isolate flex flex-col gap-8 lg:flex-row">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
            <Image
              image={promoImage}
              className="absolute mx-auto my-auto inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            {/* <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" /> */}
          </div>
          <div>
            <div className="group relative max-w-xl">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <span className="absolute inset-0" />
                {result.name}
              </h3>
              <p className="mt-5 text-sm leading-6 text-gray-600">
                {promo.description}
              </p>
            </div>
            <div className="mt-6 flex border-t border-gray-900/5 pt-6">
              <div className="relative flex items-center gap-x-4">
                <Cta
                  buttonText={promo.c_primaryCTA.label}
                  url={promo.c_primaryCTA.link}
                  style="bg-red-600 h-fit self-center"
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export { PromoCard };
{
  /* <div className="w-full flex">
        <div className="w-1/2">
          <Image image={promoImage} className="h-full w-full p-4" />
        </div>
        <div>
          <div className="flex flex-col justify-between p-8 h-full ">
            <p className="text-3xl font-bold ">{promo.name}</p>
            <div className="flex flex-row h-full">
              <p className="text-lg font-semibold my-4 w-8/12">
                {promo.description}
              </p>
              <div className="w-4/12 flex justify-end">
                <Cta
                  buttonText={promo.c_primaryCTA.label}
                  url={promo.c_primaryCTA.link}
                  style="bg-red-600 h-fit self-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */
}
