import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  LocationBias,
  Facets,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import FAQCard from "../components/cards/FAQCard";
import Loader from "../components/Loader";

const FAQsPage = () => {
  const searchActions = useSearchActions();
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("faqs");
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex mt-4">
          <div className="w-64 shrink-0 mr-5 mt-4">
            <Facets />
          </div>
          <div className="flex-grow">
            <div className="flex flex-col items-baseline">
              <ResultsCount />
              <AppliedFilters />
            </div>
            <VerticalResults
              CardComponent={FAQCard}
              customCssClasses={{
                verticalResultsContainer: `max-w-screen-xl`,
              }}
            />
            <Pagination />
            <LocationBias />
          </div>
        </div>
      )}
    </>
  );
};

export default FAQsPage;
