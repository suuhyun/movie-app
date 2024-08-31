import React from "react";
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log(data?.results[0]);
  if (isLoading) {
    <div>Loading...</div>;
  }
  if (isError) {
    <div className="text-xl text-red">{error.message}</div>;
  }
  return (
    <div
      className="absolute top-0 w-screen bg-cover bg-center bg-no-repeat -z-20"
      style={{
        height: "56vh",
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].backdrop_path})`,
      }}
    >
      <div className="absolute bg-gradient-to-t from-black to-transparent w-full h-[56vh] -z-10 bottom-0"></div>
      <div className="w-1/2 py-32 xl:px-32 md:pl-20 pl-14 flex flex-col gap-3">
        <div className="lg:text-4xl text-3xl font-semibold">{data?.results[0].title}</div>
        <div className="max-lg:h-[6.2rem] text-ellipsis overflow-hidden ...">{data?.results[0].overview}</div>
      </div>
    </div>
  );
};

export default Banner;
