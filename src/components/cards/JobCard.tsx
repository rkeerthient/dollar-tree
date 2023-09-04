import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import RTF from "../RTF";
import Job from "../../types/jobs";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Cta from "../cta";

const JobCard = (props: CardProps<Job>): JSX.Element => {
  const { result } = props;

  return (
    <div className="w-full  my-4 border p-4">
      <div>
        <span className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          {result.name}
        </span>
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

// import { CardProps } from "@yext/search-ui-react";
// import * as React from "react";
// import { useState } from "react";
// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
// import RTF from "../RTF";
// import Job from "../../types/jobs";
// import { Disclosure, Transition } from "@headlessui/react";

// const JobCard = (props: CardProps<Job>): JSX.Element => {
//   return (
//     <div className="w-full px-4 pt-16">
//       <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
//         <Disclosure>
//           {({ open }) => (
//             <>
//               <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
//                 <span>What is your refund policy?</span>
//                 <ChevronUpIcon
//                   className={`${
//                     open ? "rotate-180 transform" : ""
//                   } h-5 w-5 text-purple-500`}
//                 />
//               </Disclosure.Button>
//               <Transition
//                 enter="transition duration-100 ease-out"
//                 enterFrom="transform scale-95 opacity-0"
//                 enterTo="transform scale-100 opacity-100"
//                 leave="transition duration-75 ease-out"
//                 leaveFrom="transform scale-100 opacity-100"
//                 leaveTo="transform scale-95 opacity-0"
//               >
//                 <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
//                   If you're unhappy with your purchase for any reason, email us
//                   within 90 days and we'll refund you in full, no questions
//                   asked.
//                 </Disclosure.Panel>
//               </Transition>
//             </>
//           )}
//         </Disclosure>
//       </div>
//     </div>
//   );
// };

// export default JobCard;
