import React from "react";
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies";
import BeatLoader from "react-spinners/BeatLoader";
import MovieSlider from "../../../common/MovieSlider";

function PopularMovieSlide() {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
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
    <div>
      <MovieSlider title="Trending Movies" movies={data.results} />
    </div>
  );
}

export default PopularMovieSlide;
