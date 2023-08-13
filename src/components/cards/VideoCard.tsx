import {
  CardProps,
  useCardAnalyticsCallback,
  useCardFeedbackCallback,
} from "@yext/search-ui-react";
import * as React from "react";
import YouTube from "react-youtube";

export function VideoCard(props: CardProps<any>): JSX.Element {
  const { result } = props;
  const opts = {
    height: "270",
    width: "380",
  };
  const _onReady = (e: any) => {
    e.target.pauseVideo();
  };

  return (
    <div className="flex flex-col justify-between border rounded-lg mb-4 shadow-sm">
      <YouTube
        videoId={result.rawData.landingPageUrl?.split("v=")[1]}
        onReady={_onReady}
        opts={opts}
        className="border"
      />
      <div className="px-4">
        <p className="text-xl font-bold mt-4">{result.name}</p>
        <p className="mt-4">Posted - {result.rawData.datePosted}</p>
        <p className="mt-4">Description: {result.description}</p>
      </div>
    </div>
  );
}
