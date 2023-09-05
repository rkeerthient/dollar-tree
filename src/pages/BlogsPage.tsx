import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  Geolocation,
  Facets,
  LocationBias,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import { BlogCard } from "../components/cards/BlogCard";
import Loader from "../components/Loader";

const BlogsPage = () => {
  const searchActions = useSearchActions();
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("blogs");
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
              CardComponent={BlogCard}
              customCssClasses={{
                verticalResultsContainer: `mx-auto mt-16 grid  grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2`,
              }}
            />
            <div className="mt-6">
              <Pagination />
              <LocationBias />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogsPage;
