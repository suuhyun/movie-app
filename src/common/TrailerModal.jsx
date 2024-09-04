import React from "react";
import YouTube from "react-youtube";
import { useMovieVideoId } from "../hooks/useMovieVideoId";
import { BeatLoader } from "react-spinners";

const TrailerModal = ({ movieId, setOpenModal }) => {
  const { data, isLoading, isError, error } = useMovieVideoId({ id: movieId });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
        <BeatLoader
          color="#14c6b3"
          loading={true}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (isError) {
    return <div className="text-xl text-red-600">{error.message}</div>;
  }

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const officials = data.results.filter((video) =>
    video.name.startsWith("Official")
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-30 p-4"
      onClick={() => setOpenModal(false)}
    >
      <div
        className={`relative md:w-[80%] w-[100%] max-w-full h-0`}
        style={{ paddingBottom: "56.25%" }}
      >
        <YouTube
          videoId={officials[0]?.key}
          opts={opts}
          className="absolute inset-0"
        />
      </div>
    </div>
  );
};

export default TrailerModal;
