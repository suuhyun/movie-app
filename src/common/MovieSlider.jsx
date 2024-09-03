import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "../utils/slideSettings";
import MovieCard from "./MovieCard";

function MovieSlider({title, movies}) {

  return (
    <div className="">
      <div className="text-xl">{title}</div>
      <Slider {...settings} className="inline-block">
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Slider>
    </div>
  );
}

export default MovieSlider;
