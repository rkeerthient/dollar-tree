import * as React from "react";
import { useState } from "react";
import YouTube from "react-youtube";
import Ce_video from "../../types/video";
import { CardProps } from "@yext/search-ui-react";

const VideoCard = (props: CardProps<Ce_video>) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { name, description } = props.result;
  const { landingPageUrl } = props.result.rawData;
  const onReady = (event: any) => {
    // You can use the `event.target` to control the player
  };

  const onPlayPauseClick = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 h-full">
        <div>
          <YouTube
            videoId={landingPageUrl?.split("/").pop()}
            onReady={onReady}
            playing={isPlaying}
          />
        </div>
        <div className="font-semibold">{name}</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default VideoCard;
