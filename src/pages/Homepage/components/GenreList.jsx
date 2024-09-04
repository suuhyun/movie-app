import React from "react";
import { useMovieGenreQuery } from "../../../hooks/useMovieGenre";

const GenreList = ({ genreIdList }) => {
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
    <div className="genres flex flex-wrap gap-2 mb-5">
      {showGenre(genreIdList)?.map((genre, index) => (
        <div
          key={index}
          className="cursor-default px-1 py-.7 bg-[#14c6b3] rounded-md text-xs !text-black whitespace-nowrap"
        >
          {genre}
        </div>
      ))}
    </div>
  );
};

export default GenreList;
