import React, { useState } from "react";
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies";
import { FaChevronRight, FaPlay } from "react-icons/fa";
import TrailerModal from "../../../common/TrailerModal";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Banner = () => {
    const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
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
    <div className="text-xl text-red">{error.message}</div>;
  }
  return (
    <div
      className="absolute top-0 w-screen bg-cover bg-center bg-no-repeat "
      style={{
        height: "56vh",
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].backdrop_path})`,
      }}
    >
      {openModal && (
        <TrailerModal
          movieId={data?.results[0].id}
          setOpenModal={setOpenModal}
        />
      )}
      <div className="absolute bg-gradient-to-t from-black to-transparent w-full h-[56vh] z-1 bottom-0"></div>
      <div className="w-1/2 h-full justify-center flex flex-col gap-3 pl-12">
        <div className="lg:text-4xl text-3xl font-bold max-sm:mt-14 !z-20">
          {data?.results[0].title}
        </div>
        <div className="max-lg:h-[6.2rem] font-thin line-clamp-4 !z-20">
          {data?.results[0].overview}
        </div>
        <div className="flex gap-5 font-semibold !z-20">
          <button className="!cursor-pointer hover:opacity-70 !z-20 mt-7 w-fit flex items-center bg-[#14c6b3] text-black p-2 px-5 rounded-full gap-2" onClick={() => navigate(`/movies/${data?.results[0].id}`)}>
            Details
            <FaChevronRight />
          </button>
          <button
            className="!cursor-pointer hover:opacity-70 !z-2 mt-7 w-fit flex items-center bg-[#14c6b3] text-black p-2 px-5 rounded-full gap-2"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Trailer
            <FaPlay className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
