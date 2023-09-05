import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  Geolocation,
  Facets,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { VideoCard } from "../components/cards/VideoCard";

const VideosPage = ({ sendDataToParent }: any) => {
  const searchActions = useSearchActions();
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("video");
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex mt-4">
          <div className="flex-grow">
            <div className="flex flex-col items-baseline">
              <ResultsCount />
              <AppliedFilters />
            </div>
            <VerticalResults
              CardComponent={VideoCard}
              customCssClasses={{
                verticalResultsContainer: "grid grid-cols-3 gap-4",
              }}
            />
            <Pagination />
            <Geolocation />
          </div>
        </div>
      )}
    </>
  );
};

export default VideosPage;
