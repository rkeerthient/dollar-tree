import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import Ce_product from "../../types/products";
import { StarIcon } from "@heroicons/react/20/solid";

type ProductCardProps = CardProps<Ce_product> & {
  autocomplete?: boolean;
};
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const ProductCard = ({ result, autocomplete }: ProductCardProps) => {
  const product = result.rawData;
  const productImage = product.photoGallery?.[0];

  return (
    <div className="p-4 border flex flex-col gap-4">
      <div>
        {productImage && (
          <Image layout="fill" height={288} image={productImage} />
        )}
      </div>
      <div className="pl-3">
        <p className="text-xs font-bold h-4">{product.brand?.toUpperCase()}</p>
        <p className="h-20">
          <a
            href={product.slug}
            className="mb-2 pt-1 font-bold  text-zinc-900 hover:underline"
          >
            {product.name}
          </a>
        </p>
        <div className="ml-1 flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                product.c_rating > rating ? "text-green-500" : "text-gray-200",
                "h-5 w-5 flex-shrink-0"
              )}
              aria-hidden="true"
            />
          ))}{" "}
          <div>{product.c_rating}</div> <div>({product.c_noOfVotes})</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-gray-400 text-sm">Minimum You Can Buy: 4</div>
          <div className="flex flex-col">
            <div className="text-xl text-green-500 font-bold">
              ${product.price?.value}
            </div>
            <div className="text-gray-700">per unit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
