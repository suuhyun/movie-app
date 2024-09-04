import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useSearchMovieById } from "../hooks/useSearchMovieById";
import { FaStar } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { TbRating14Plus, TbRating18Plus } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import TrailerModal from "../common/TrailerModal";

const MovieDetailPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const { data, isLoading, isError, error } = useSearchMovieById({ id });
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
  const formatRuntime = (minutes) => {
    if (minutes === 0) {
      return "0h";
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) {
      return `${mins}m`;
    }
    return `${hours}h${mins > 0 ? ` ${mins}m` : ""}`;
  };
  return (
    <div className="flex justify-center">
      {openModal && <TrailerModal movieId={data.id} setOpenModal={setOpenModal} />}
      <div className="grid md:grid-cols-2 grid-cols-1 md:w-4/5">
        <div className="relative">
          <img
            src={`https://www.themoviedb.org/t/p/w1280${data.poster_path}`}
            alt=""
            className="max-md:hidden lg:px-20 md:px-10"
          />
          <img
            src={`https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data.poster_path}`}
            className="md:hidden"
            alt=""
          />
          <div className="absolute md:hidden h-1/2 bg-gradient-to-t from-black to-transparent w-full !z-20 bottom-0"></div>
        </div>
        <div className="flex flex-col max-md:m-10 lg:pr-20 gap-1">
          <div className="flex gap-2 my-2 !flex-wrap">
            {data.genres.map((genre) => (
              <button className="text-nowrap p-1 px-2 bg-gray-500 bg-opacity-40 rounded-lg font-semibold h-fit text-sm">
                {genre.name}
              </button>
            ))}
          </div>
          <div className="opacity-70">
            {formatRuntime(data.runtime)} &#x2022; {data.release_date} &#x2022;{" "}
            {data.spoken_languages[0].english_name}
          </div>
          <div className="lg:text-5xl text-4xl mb-3">{data.title}</div>
          <div>{data.tagline}</div>

          <div className="flex gap-3 mt-3">
            <div className="flex items-center gap-1 text-md">
              <FaStar className="text-yellow-500" />
              {Math.round(data?.vote_average * 100) / 100}
            </div>
            <div className="flex items-center gap-1 text-md">
              <IoPeople className="text-gray-400" />
              {data?.popularity}
            </div>
            <div className="text-3xl">
              {data?.adult ? (
                <TbRating18Plus className="text-red-500" />
              ) : (
                <TbRating14Plus className="text-red-500" />
              )}
            </div>
          </div>
          <hr className="my-3 opacity-70" />
          <div className="">{data.overview}</div>
          <hr className="my-3 opacity-70" />
          <div className="font-semibold">
            <div>
              <span className="text-[#14c6b3]">Revenue :</span> $
              {data.revenue.toLocaleString()}
            </div>
            <div>
              <span className="text-[#14c6b3]">Budget :</span> $
              {data.budget.toLocaleString()}
            </div>
          </div>
          <div className="flex gap-5 *:py-2 *:px-8 *:bg-[#14c6b3] *:rounded-full text-black my-8">
            <button
              className="items-center flex gap-2 text-lg"
              onClick={() => {
                setOpenModal(true);
                console.log(openModal);
              }}
            >
              Trailer
              <FaPlay className="text-sm" />
            </button>
            <button className="text-lg" onClick={() => navigate(`./reviews`)}>Reviews</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
