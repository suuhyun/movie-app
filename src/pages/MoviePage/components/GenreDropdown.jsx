import React from "react";
import { BeatLoader } from "react-spinners";
import { useMovieGenreQuery } from "../../../hooks/useMovieGenre";

const GenreDropdown = ({ setGenreOption }) => {
  const { data, isLoading, isError, error } = useMovieGenreQuery();

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <BeatLoader
          color="#14c6b3"
          loading={true}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (isError) {
    return <div className="text-xl text-red-600">{error.message}</div>;
  }

  const handleGenreChange = (event) => {
    setGenreOption(event.target.value);
  };

  return (
    <div className="flex items-center gap-4 md:justify-between">
      <div className="font-bold text-white">Genre:</div>
      <select
        className="bg-gray-800 text-white border border-gray-600 rounded px-4 py-2 focus:outline-none"
        name="genre"
        onChange={handleGenreChange}
      >
        <option value="Options">Options</option>
        {data.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreDropdown;
