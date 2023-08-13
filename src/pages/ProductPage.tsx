import {
  FieldValueStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import {
  AppliedFilters,
  Facets,
  LocationBias,
  Pagination,
  ResultsCount,
  VerticalResults,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import { ProductCard } from "../components/cards/ProductCard";
import Department from "../components/Department";
import { DirectoryItem } from "../components/DepartmentsType";
import SortDropdown from "../components/SortDropdown";
type ProductPageProps = {
  initialFilter?: FieldValueStaticFilter;
  breadcrumbLinks?: any[];
  selectedFilter: string;
  subCatrgories?: DirectoryItem[];
  selectedName: string;
};
const ProductPage = ({
  initialFilter,
  selectedFilter,
  subCatrgories,
  selectedName,
}: ProductPageProps) => {
  const searchActions = useSearchActions();
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
  console.log(JSON.stringify(selectedName));

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("products");
    initialFilter &&
      searchActions.setStaticFilters([
        { filter: initialFilter, selected: true },
      ]);
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <>
      <div className="flex mt-4">
        <div className="w-64 shrink-0 mr-5 mt-4">
          {subCatrgories && (
            <>
              {selectedName && (
                <>
                  <div className="text-2xl text-[#5da36e]">{selectedName}</div>
                  <hr className="my-4" />
                </>
              )}
              <Department data={subCatrgories}></Department>
              <hr className="my-4" />
            </>
          )}
          <Facets excludedFieldIds={[selectedFilter]}></Facets>
        </div>
        <div className="flex-grow">
          <div className="flex  items-baseline justify-between">
            <ResultsCount /> <SortDropdown />
          </div>
          <div className="flex justify-between mb-4">
            <AppliedFilters hiddenFields={[selectedFilter]} />
          </div>
          <VerticalResults
            CardComponent={ProductCard}
            customCssClasses={{
              verticalResultsContainer: "grid grid-cols-3",
            }}
          ></VerticalResults>
          <div className="mt-8">
            <Pagination />
            <LocationBias />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
