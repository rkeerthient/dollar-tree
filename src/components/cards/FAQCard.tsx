import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import Faq from "../../types/faqs";
import RTF from "../RTF";

const FAQCard = (props: CardProps<Faq>): JSX.Element => {
  const { result } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full  my-4 ">
      <div className="text-xl">
        <div onClick={() => setIsActive(!isActive)}>
          <div
            className={`text-[#0c8147] ${
              isActive ? "bg-[#cee1cb]" : "bg-[#e7f1e6]"
            } p-4 hover:cursor-pointer`}
          >
            <span>{result.name}</span>
            <div style={{ float: "right" }}>
              {isActive ? (
                <ChevronUpIcon className="w-7 text-[#083b3a]" />
              ) : (
                <ChevronDownIcon className="w-7 text-[#083b3a]" />
              )}
            </div>
          </div>
        </div>
        {isActive && (
          <div className="  p-3  text-base	">
            <RTF>{result.rawData.c_richTextDescription}</RTF>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQCard;
