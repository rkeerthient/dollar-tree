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
import VideoCard from "../components/cards/VideoCard";

const VideosPage = ({ sendDataToParent }: any) => {
  const searchActions = useSearchActions();
  const loadingState =
    useSearchState((state) => state.searchStatus.isLoading) || true;

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("video");
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <>
      <div className="flex mt-4">
        {/* <div className="w-64 shrink-0 mr-5 mt-4">
          <Facets />
        </div> */}
        <div className="flex-grow">
          <div className="flex flex-col items-baseline">
            <ResultsCount />
            <AppliedFilters />
          </div>
          <VerticalResults
            CardComponent={VideoCard}
            customCssClasses={{
              verticalResultsContainer: `grid grid-cols-3 gap-2`,
            }}
          />
          <Pagination />
          <LocationBias />
        </div>
      </div>
    </>
  );
};

export default VideosPage;
