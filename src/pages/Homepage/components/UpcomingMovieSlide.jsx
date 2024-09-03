import React from "react";
import { useUpcomingMoviesQuery } from "../../../hooks/useUpcomingMovies";
import BeatLoader from "react-spinners/BeatLoader";
import MovieSlider from "../../../common/MovieSlider";

function UpcomingMovieSlide() {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();
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
      <MovieSlider title='Upcoming Movies' movies={data.results} />
    </div>
  );
}

export default UpcomingMovieSlide;
