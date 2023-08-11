import * as React from "react";
import Img, { Image } from "./Img";
import Header from "./header";
import Footer from "./footer";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import { TemplateProps } from "@yext/pages";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "./searchConfig";
import { MyContextProvider } from "../context/context";
import { LocationsProvider } from "../context/LocationsContext";

type Props = {
  title?: string;
  _site?: any;
  templateData?: TemplateProps;
  children?: React.ReactNode;
};

const PageLayout = ({ title, _site, children, templateData }: Props) => {
  return (
    <MyContextProvider>
      <LocationsProvider>
        <SearchHeadlessProvider searcher={provideHeadless(searchConfig)}>
          {/* <AnalyticsProvider templateData={templateData}> */}
          <div className="min-h-screen">
            <AnalyticsScopeProvider name={"header"}>
              <Header _site={_site} />
            </AnalyticsScopeProvider>
            {children}
            <AnalyticsScopeProvider name={"footer"}>
              <Footer />
            </AnalyticsScopeProvider>
          </div>
          {/* </AnalyticsProvider>  */}
        </SearchHeadlessProvider>
      </LocationsProvider>
    </MyContextProvider>
  );
};

export default PageLayout;
