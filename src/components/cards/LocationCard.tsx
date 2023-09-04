import * as React from "react";
import { CardComponent } from "@yext/search-ui-react";
import { BsPin, BsPhone } from "react-icons/bs";
import HoursText from "../HoursText";
import { BiTime } from "react-icons/bi";
import { iconMapping, capitalizeFirstLowercaseRest } from "../CustomFacet";

const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};

const LocationCard: CardComponent<any> = ({ result }) => {
 
  const { address } = result.rawData;
  var gmaps = "https://www.google.com/maps/dir/?api=1&destination=";
  var gmapsAddress = gmaps.concat(
    address.line1,
    " ",
    address.city,
    " ",
    address.region,
    " ",
    address.postalCode
  );
  var gmapsLink = gmapsAddress.concat('"');

  return (
    <div className="p-4 my-2 border  hover:border hover:border-gray-400  ">
      <a target="_blank" href={`${result.rawData.slug}`} className="space-y-3">
        <div className="flex justify-between">
          <h1 className="text-green-800 text-xl">{result.rawData.name}</h1>
          <p className="mt-1 text-xs italic text-slate-500">
            {metersToMiles(result.distance ?? 0)} mi
          </p>
        </div>
        <div className=" space-y-3">
          <div className="flex flex-row gap-2">
            <div>
              <BsPin color="#5da36e" />
            </div>
            <div className="-mt-1">
              <p className="text-sm text-slate-700">Store #{result.id}</p>
              <p className="text-sm text-slate-700">{address.line1}</p>
              <p className="text-sm text-slate-700">
                {address.city}, {address.region}, {address.postalCode}{" "}
              </p>
            </div>
          </div>
          <div className="text-sm text-slate-700 font-semibold">
            <div className="flex flex-row gap-2 items-center">
              <div>
                <BsPhone color="#5da36e" />
              </div>
              <div>
                {result.rawData.mainPhone &&
                  result.rawData.mainPhone
                    .replace("+1", "")
                    .replace(/\D+/g, "")
                    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-700 font-semibold">
          <div className="flex flex-row gap-2 items-center">
            <div>
              <BiTime color="#5da36e" />
            </div>
            <div>
              <HoursText
                document={result.rawData}
                styles="text-sm font-bold"
              ></HoursText>
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-700 font-semibold">
          <div className="text-sm font-bold">Store Amenities:</div>
          <div className="flex text-xs gap-2 mt-2 flex-wrap">
            {result.rawData.services.map((item: any, index: any) => (
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-gray-300">
                  <img
                    src={
                      iconMapping[
                        item.includes(" ") ||
                        item.includes("/") ||
                        item.includes(",")
                          ? capitalizeFirstLowercaseRest(item)
                          : item
                      ]
                    }
                    alt=""
                    className="max-w-full max-h-full rounded-full border border-black"
                  />
                </div>
                <div>
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <a
            target="_blank"
            href={gmapsLink}
            className="text-sm text-center bg-orange-500 hover:bg-[#666] text-white py-2 px-8"
          >
            Get Directions
          </a>
          <a
            target="_blank"
            href={gmapsLink}
            className="text-sm text-center bg-orange-500 hover:bg-[#666] text-white py-2 px-8"
          >
            SHIP TO THIS STORE
          </a>
        </div>
      </a>
    </div>
  );
};

export default LocationCard;
