import React from "react";
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies";
import Slider from "react-slick";
import MovieCard from "./MovieCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "../../../utils/slideSettings";
import { useUpcomingMoviesQuery } from "../../../hooks/useUpcomingMovies";
import BeatLoader from "react-spinners/BeatLoader";

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
      <div className="text-xl">Upcoming Movies</div>
      <Slider {...settings} className="inline-block">
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Slider>
    </div>
  );
}

export default UpcomingMovieSlide;
