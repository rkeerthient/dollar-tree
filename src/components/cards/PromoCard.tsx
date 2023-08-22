import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Cta from "../cta";

const PromoCard = ({ result }: CardProps<any>) => {
  const promo = result.rawData;
  const promoImage = promo.photoGallery?.[0];

  return (
    <>
      <div className="relative overflow-hidden min-h-fit h-64 border rounded-lg shadow-sm bg-gray-900 bg-opacity-70">
        <Image
          image={promoImage}
          className="object-cover absolute -z-10 rounded-lg w-fit object-bottom"
        />
        <div className="flex flex-col justify-between p-8 h-full text-white">
          <p className="text-3xl font-bold ">{promo.name}</p>
          <div className="flex flex-row h-full">
            <p className="text-lg font-semibold my-4 w-8/12">{promo.description}</p>
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
    </>
  );
};

export { PromoCard };
