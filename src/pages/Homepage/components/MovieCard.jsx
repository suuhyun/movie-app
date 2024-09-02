import React from "react";
import { TbRating14Plus, TbRating18Plus } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import movieGenres from "../../../utils/movieGenres";

const MovieCard = ({ movie }) => {
  return (
    <div
      className="text-white bg-cover bg-center bg-no-repeat m-5 rounded hover:scale-125 transition ease"
      style={{
        aspectRatio: "2 / 3",
        backgroundImage: `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie?.poster_path})`,
      }}
    >
      <div className="w-full h-full hover:opacity-100 bg-[rgba(43,41,41,0.7)] opacity-0 transition-all ease p-3 content-center">
        <div className="font-semibold text-xl mb-2">{movie?.title}</div>
        <div className="genres flex gap-2 overflow-x-auto mb-5">
          {movie?.genre_ids.map((genre) => (
            <button className="px-1 bg-[#14c6b3] rounded-md font-thin text-xs !text-black">
              {movieGenres[genre]}
            </button>
          ))}
        </div>
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-1 text-sm">
              <FaStar />
              {Math.round(movie?.vote_average * 100) / 100}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <IoPeople />
              {movie?.popularity}
            </div>
          </div>
          <div className="text-3xl">
            {movie?.adult ? <TbRating18Plus /> : <TbRating14Plus />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
