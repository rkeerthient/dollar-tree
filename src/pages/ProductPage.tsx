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
};
const ProductPage = ({
  initialFilter,
  selectedFilter,
  subCatrgories,
}: ProductPageProps) => {
  const searchActions = useSearchActions();
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
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
              <Department data={subCatrgories}></Department>
              <hr className="my-4" />
            </>
          )}
          <Facets excludedFieldIds={[selectedFilter]}></Facets>
        </div>
        <div className="flex-grow">
          <div className="flex flex-col items-baseline">
            <ResultsCount />
            <AppliedFilters hiddenFields={[selectedFilter]} />
          </div>
          <div className="flex justify-end mb-4">
            <SortDropdown />
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
