import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./MovieCard";

function MovieSlider({title, movies, settings}) {

  return (
    <div className="">
      <div className="text-2xl">{title}</div>
      {movies.length > 0 ? <Slider {...settings} className="inline-block">
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Slider> :<div className="mt-3">No movies</div>}
      
    </div>
  );
}

export default MovieSlider;
