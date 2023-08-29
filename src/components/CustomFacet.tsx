import {
  Matcher,
  NumberRangeValue,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import * as React from "react";
import {
  HybridStores,
  AcceptsEBT,
  AdultBeverages,
  ATM,
  BillPay,
  BOPIS,
  RefrigeratedFrozen,
  Helium,
  Ice,
  Propane,
  RedBox,
  Tobacco,
  WaterMachine,
  WomenInfantsAndChildrenWIC,
} from "../assets/LocationIcons";

interface TileFacetProps {
  fieldId: string;
  displayName?: string;
}

const capitalizeFirstLowercaseRest = (str: string) => {
  console.log(str);

  if (str === "Refrigerated/Frozen") str = "Frozen";
  let x = str
    .split(" ")
    .map((item) =>
      item === item.toUpperCase()
        ? item
        : item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
    )
    .join("");
  console.log(x);

  return x;
};

const iconMapping: Record<string, string> = {
  HybridStores: HybridStores,
  AcceptsEBT: AcceptsEBT,
  AdultBeverages: AdultBeverages,
  ATM: ATM,
  BillPay: BillPay,
  BOPIS: BOPIS,
  Frozen: RefrigeratedFrozen,
  Helium: Helium,
  Ice: Ice,
  Propane: Propane,
  RedBox: RedBox,
  Tobacco: Tobacco,
  WaterMachine: WaterMachine,
  "Women,InfantsAndChildren(wic)": WomenInfantsAndChildrenWIC,
};

const CustomFacet = ({ fieldId }: TileFacetProps): JSX.Element | null => {
  const searchActions = useSearchActions();
  const facet = useSearchState(
    (state) => state.filters.facets?.find((f) => f.fieldId === fieldId)
  );

  const handleFacetClick = (
    value: string | number | boolean | NumberRangeValue,
    selected: boolean,
    matcher = Matcher.Equals
  ) => {
    searchActions.setFacetOption(fieldId, { matcher, value }, selected);
    searchActions.executeVerticalQuery();
  };

  return facet && facet.options.length > 0 ? (
    <div className="mb-4 bg-gray-200 p-3 flex flex-row text-sm">
      <div className="max-w-fit flex-none text-[#017535] font-bold mt-2">
        Store Amenities:
      </div>
      <div className="w-full  flex flex-wrap">
        {facet.options.map((o, i) => (
          <div key={`${fieldId}_${i}`} className="mr-3 mb-3">
            <div className="px-3 text-sm ">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={o.selected}
                  className="hover:cursor-pointer"
                  onChange={() => handleFacetClick(o.value, !o.selected)}
                />
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-300 ">
                  <img
                    src={
                      iconMapping[
                        o.displayName.includes(" ") ||
                        o.displayName.includes("/") ||
                        o.displayName.includes(",")
                          ? capitalizeFirstLowercaseRest(o.displayName)
                          : o.displayName
                      ]
                    }
                    alt=""
                    className="max-w-full max-h-full rounded-full border border-black"
                  />
                </div>

                <div>
                  <span>{o.displayName}</span>
                  <span>({o.count})</span>
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default CustomFacet;
