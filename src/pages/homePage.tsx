import { useSearchState } from "@yext/search-headless-react";
import {
  DirectAnswer,
  ResultsCount,
  SpellCheck,
  UniversalResults,
} from "@yext/search-ui-react";
import * as React from "react";

import RTF from "../components/RTF";
import FAQCard from "../components/cards/FAQCard";
import Mapboxuniv from "../components/cards/Mapboxuniv";
import { ProductCard } from "../components/cards/ProductCard";
import UnivLocationCard from "../components/cards/univLocCard";
import { BlogCard } from "../components/cards/BlogCard";
import Loader from "../components/Loader";
import { PromoCard } from "../components/cards/PromoCard";
import { VideoCard } from "../components/cards/VideoCard";
import JobCard from "../components/cards/JobCard";

const HomePage = () => {
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  const featuredSnippet = useSearchState((state) => state.directAnswer.result);
  const res = useSearchState((state) => state.universal.verticals);

  const LocationSection = ({ results, CardComponent, header }: any) => {
    return (
      <div>
        <div>{header}</div>
        <div className="univLocMap ">
          <Mapboxuniv data={results}></Mapboxuniv>
        </div>
        <div className="flex flex-col w-full gap-4   bg-white">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };

  const GridSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-8 ">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  const GridSection3Col = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-8 ">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };

  const PromoSection = ({ results, CardComponent }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div className="">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  const buildResponse = (snippet: any) => {
    return (
      <div className="flex flex-col bg-white my-4 mb-8 p-4 gap-4">
        <RTF>{snippet.snippet.value}</RTF>
        <div className="pt-4 text-neutral">
          Read more about{" "}
          <a
            className="text-primary"
            href={`/${snippet.relatedResult.rawData.slug}`}
          >
            {snippet.relatedResult.rawData.name}
          </a>
        </div>
      </div>
    );
  };
  return (
    <>
      {loading && <Loader />}
      {!loading && (!res || res.length <= 0) && (
        <div className="centered-container space-y-16">
          <img src="https://i.imgur.com/llPVQuH.png" alt="" />
          <img src="https://i.imgur.com/A1ex5HW.png" alt="" />
          <img src="https://i.imgur.com/xQMCmnn.png" alt="" />
          <img src="https://i.imgur.com/VjMjAey.png" alt="" />
        </div>
      )}
      {!loading && (
        <div className="centered-container">
          <ResultsCount></ResultsCount>
          {featuredSnippet && featuredSnippet.fieldType !== "rich_text" ? (
            <DirectAnswer customCssClasses={{ answerContainer: "bg-white" }} />
          ) : (
            featuredSnippet && buildResponse(featuredSnippet)
          )}
          <UniversalResults
            showAppliedFilters={true}
            customCssClasses={{
              universalResultsContainer: "w-full mx-auto my-6 ",
            }}
            verticalConfigMap={{
              faqs: {
                CardComponent: FAQCard,
                viewAllButton: true,
                label: "FAQs",
              },
              jobs: {
                CardComponent: JobCard,
                viewAllButton: true,
                label: "Jobs",
              },
              products: {
                CardComponent: ProductCard,
                SectionComponent: GridSection,
                label: "Products",
                viewAllButton: true,
              },
              video: {
                CardComponent: VideoCard,
                SectionComponent: GridSection3Col,
                label: "Videos",
                viewAllButton: true,
              },
              blogs: {
                CardComponent: BlogCard,
                SectionComponent: GridSection3Col,
                label: "Blogs",
                viewAllButton: true,
              },
              locations: {
                CardComponent: UnivLocationCard,
                SectionComponent: LocationSection,
                viewAllButton: true,
              },
              promotion: {
                CardComponent: PromoCard,
                SectionComponent: PromoSection,
                label: "Promotions",
                viewAllButton: true,
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default HomePage;
