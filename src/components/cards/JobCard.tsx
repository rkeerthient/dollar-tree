import { CardProps } from "@yext/search-ui-react";
import * as React from "react";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import RTF from "../RTF";
import Job from "../../types/jobs";
import { Disclosure, Transition } from "@headlessui/react";
import Cta from "../cta";
import { FiMapPin } from "react-icons/fi";

const JobCard = (props: CardProps<Job>): JSX.Element => {
  const { result } = props;

  return (
    <div className="w-full  my-4 border p-4">
      <div>
        <div className="flex flex-col mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 gap-3">
          <div>{result.name}</div>
          <div className="flex gap-2 text-sm items-center">
            <div>
              <FiMapPin />
            </div>
            <div> {result.rawData.location?.externalLocation}</div>
          </div>
          <div className="text-sm text-gray-600">
            Posted on {formatDateToCustomString(result.rawData.datePosted)} |{" "}
            {result.rawData.employmentType} |{" "}
          </div>
        </div>

        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex gap-5">
                <div className=" pt-4 pb-2 text-sm text-gray-500 w-4/5">
                  Work where you love to shop! Family Dollar is hiring in your
                  neighborhood. Avoid long commutes and set your own course to
                  success by applying today. We offer generous benefits,
                  flexible work schedules and the ability to work today and get
                  paid tomorrow. As a Family Dollar Assistant Store Manager you
                  will responsible for providing exceptional service to our
                  customers. A key priority includes assisting the Store Manager
                  in the daily operation of the store. Under the direction of
                  the Store Manager, you will also be responsible for
                  maintaining inventories, store appearance and completing daily
                  paperwork.
                </div>
                <div className="flex border-gray-900/5  ">
                  <div className="relative flex items-center gap-x-4">
                    <Cta
                      buttonText={"Apply now"}
                      url={result.rawData.landingPageUrl}
                      style="bg-orange-500 h-fit self-center"
                    />
                  </div>
                </div>
              </div>

              <Disclosure.Button className="flex w-full justify-start rounded-lg   py-2 text-left font-medium  focus:outline-none  focus-visible:ring-opacity-75 items-center">
                <span>{open ? "Show less" : "Show more"}</span>
                <ChevronDownIcon
                  className={`${open ? "rotate-180 transform" : ""} h-5 w-5 `}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className=" pb-2 text-sm  ">
                  <RTF>{result.rawData.c_richTextDescription}</RTF>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default JobCard;

function formatDateToCustomString(inpDate: string) {
  const date = new Date(inpDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const suffix = getDaySuffix(day);

  return `${day}${suffix} ${month} ${year}`;
}

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
