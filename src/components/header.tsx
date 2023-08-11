import * as React from "react";
import { Image } from "@yext/pages/components";
import {
  DropdownItem,
  FocusedItemData,
  RenderEntityPreviews,
  SearchBar,
  onSearchFunc,
} from "@yext/search-ui-react";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  useSearchState,
  useSearchActions,
  provideHeadless,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import { useMyContext } from "../context/context";
import { config } from "../templates/category_results";
import Product from "../types/products";
import searchConfig from "./searchConfig";
import SpeechToText from "./SpeechToText";
type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Products",
    url: "/products",
  },
  {
    label: "FAQs",
    url: "/faqs",
  },
  {
    label: "Locations",
    url: "/locator",
  },
  {
    label: "Videos",
    url: "/videos",
  },
];

const Header = ({ _site }: any) => {
  const { logo } = _site;
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url}>{link.label}</a>
    </div>
  ));
  const state = useSearchState((state) => state.vertical.verticalKey);
  const searchActions = useSearchActions();
  const { setPromoData } = useMyContext();
  const [path, setPath] = React.useState("");
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    setPath(currentPath);
    return () => {};
  }, []);
  const entityPreviewSearcher = provideHeadless({
    ...searchConfig,
    headlessId: "entity-preview-searcher",
  });

  const renderEntityPreviews: RenderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalKeyToResults: Record<string, VerticalResultsData>,
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ): JSX.Element | null => {
    const productResults = verticalKeyToResults["products"]?.results.map(
      (result) => result.rawData
    ) as unknown as Product[];

    return productResults ? (
      <div className="grid grid-cols-4 px-8">
        {productResults.map((result) => (
          <DropdownItem
            key={result.id}
            value={result.name}
            onClick={() => history.pushState(null, "", `/product/${result.id}`)}
            ariaLabel={dropdownItemProps.ariaLabel}
          >
            <DropdownItem
              key={result.id}
              value={result.name}
              ariaLabel={dropdownItemProps.ariaLabel}
            >
              <a href={result.slug}>
                {result.photoGallery && (
                  <img
                    src={result.photoGallery[0].image.url}
                    alt=""
                    className="h-full w-32 mx-auto"
                  />
                )}
                <div className="text-sm">{result.name}</div>
              </a>
            </DropdownItem>
          </DropdownItem>
        ))}
      </div>
    ) : null;
  };

  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    const path = window.location.pathname;
    const queryParams = new URLSearchParams(window.location.search);

    if (query) {
      queryParams.set("query", query);
    } else {
      queryParams.delete("query");
    }
    ["/index", undefined, "/"].includes(path)
      ? (query && searchActions.setQuery(query),
        searchActions.setUniversal(),
        searchActions.executeUniversalQuery())
      : path === "/product-grid"
      ? (searchActions.setUniversal(),
        query && searchActions.setQuery(query),
        searchActions.setUniversal(),
        searchActions
          .executeUniversalQuery()
          .then((res) =>
            res?.verticalResults[0].verticalKey === "promotion"
              ? setPromoData(res)
              : setPromoData("")
          )
          .then(() => {
            searchActions.setVertical("products");
            query && searchActions.setQuery(query);
            searchActions.executeVerticalQuery();
          }))
      : path.includes("products") &&
        (window.location.href = `/index?${queryParams.toString()}`);
  };
  const handleDataFromChild = (data: any, listenStatus: any) => {
    data && searchActions.setQuery(data);
    !listenStatus && !state
      ? (searchActions.setUniversal(), searchActions.executeUniversalQuery())
      : (searchActions.setVertical(state!),
        searchActions.executeVerticalQuery());
  };
  return (
    <>
      <div className="centered-container">
        <nav className=" flex  flex-col">
          <div className="flex flex-row  items-center gap-8 justify-between">
            <Image image={logo} layout="fixed" height={150}></Image>
            <div className="ml-10 space-x-4 flex-1">
              <div className="w-full flex bg-white gap-2 items-center pr-3 border">
                <SearchBar
                  hideRecentSearches={true}
                  customCssClasses={{
                    searchBarContainer: "!mb-0 flex-1 searchBar",
                  }}
                  {...(state &&
                    state !== "products" && { includedVerticals: [] })}
                  {...(state === "products" && {
                    visualAutocompleteConfig: {
                      entityPreviewSearcher: entityPreviewSearcher,
                      includedVerticals: ["products"],
                      renderEntityPreviews: renderEntityPreviews,
                      universalLimit: { products: 4 },
                      entityPreviewsDebouncingTime: 300,
                    },
                    onSearch: handleSearch,
                  })}
                />
                <div className="w-fit text-black">
                  <SpeechToText
                    sendDataToParent={handleDataFromChild}
                  ></SpeechToText>
                </div>
              </div>
            </div>
            <div className="flex gap-6 !text-green-500 items-center">
              <div className="text-white bg-red-600 font-bold p-2">
                Shop plus
              </div>
              <div className="flex flex-col gap-1 items-center ">
                <div>
                  <FaRegUser size={25} />
                </div>
                <div>Account</div>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <div>
                  <AiOutlineShoppingCart size={25} />
                </div>
                <div>Cart</div>
              </div>
            </div>
          </div>
          <div className="flex gap-x-10 text-lg">{linkDoms}</div>
        </nav>
        <hr className="my-4" />
      </div>
    </>
  );
};

export default Header;
