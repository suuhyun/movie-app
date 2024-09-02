import React from "react";
import Banner from "./components/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide";

const Homepage = () => {
  return (
    <div className="">
      <Banner />
      <div className="mt-[56vh] mx-12 flex flex-col gap-10">
      <PopularMovieSlide />
      <TopRatedMovieSlide />
      <UpcomingMovieSlide />
      </div>
    </div>
  );
};

export default Homepage;
