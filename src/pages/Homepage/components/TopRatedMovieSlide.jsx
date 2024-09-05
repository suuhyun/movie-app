import React from "react";
import { useTopRatedMoviesQuery } from "../../../hooks/useTopRatedMovies";
import BeatLoader from "react-spinners/BeatLoader";
import MovieSlider from "../../../common/MovieSlider";
import { homepageSettings } from "../../../utils/slideSettings";

function TopRatedMovieSlide() {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();
  if (isLoading) {
    return (
      <BeatLoader
        color="#14c6b3"
        loading="true"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
  if (isError) {
    return <div className="text-xl text-red">{error.message}</div>;
  }

  return (
    <div className="">
      <MovieSlider title="Top Rated Movies" movies={data.results} settings={homepageSettings} />
    </div>
  );
}

export default TopRatedMovieSlide;
