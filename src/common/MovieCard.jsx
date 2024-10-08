import React from "react";
import { TbRating14Plus, TbRating18Plus } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import GenreList from "../pages/Homepage/components/GenreList";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const goToDetailPage = () => {
    navigate(`/movies/${movie.id}`)
  }
  return (
    <div
      className="text-white bg-cover bg-center bg-no-repeat m-5 rounded lg:hover:scale-125 hover:scale-110 transition ease cursor-pointer"
      style={{
        aspectRatio: "2 / 3",
        backgroundImage: movie?.poster_path ? `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie?.poster_path})` : 'url(https://www.rastanley.com.au/img/products/NoImageLarge.png)',
      }}
      onClick={goToDetailPage}
    >
      <div className="w-full h-full hover:opacity-100 bg-[rgba(43,41,41,0.7)] opacity-0 transition-all ease-in-out delay-150 p-3 content-center">
        <div className="font-semibold text-xl mb-2 line-clamp-3">{movie?.title}</div>
        <GenreList genreIdList={movie?.genre_ids} />
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
