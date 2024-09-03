import React from "react";
import { TbRating14Plus, TbRating18Plus } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { useMovieGenreQuery } from "../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList?.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };
  return (
    <div
      className="text-white bg-cover bg-center bg-no-repeat m-5 rounded lg:hover:scale-125 hover:scale-110 transition ease cursor-pointer"
      style={{
        aspectRatio: "2 / 3",
        backgroundImage: movie?.poster_path ? `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie?.poster_path})` : 'url(https://www.rastanley.com.au/img/products/NoImageLarge.png)',
      }}
    >
      <div className="w-full h-full hover:opacity-100 bg-[rgba(43,41,41,0.7)] opacity-0 transition-all ease-in-out delay-150 p-3 content-center">
        <div className="font-semibold text-xl mb-2">{movie?.title}</div>
        <div className="genres flex flex-wrap gap-2 mb-5">
          {showGenre(movie?.genre_ids)?.map((genre, index) => (
            <div
              key={index}
              className="cursor-default px-1 py-.7 bg-[#14c6b3] rounded-md text-xs !text-black whitespace-nowrap"
            >
              {genre}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-1 text-sm">
              <FaStar className="text-yellow-500" />
              {Math.round(movie?.vote_average * 100) / 100}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <IoPeople className="text-gray-400" />
              {movie?.popularity}
            </div>
          </div>
          <div className="text-3xl">
            {movie?.adult ? (
              <TbRating18Plus className="text-red-500" />
            ) : (
              <TbRating14Plus className="text-red-500" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
