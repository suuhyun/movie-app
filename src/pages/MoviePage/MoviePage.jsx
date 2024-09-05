import React, { useRef, useCallback, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import MovieCard from "../../common/MovieCard";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import SortDropdown from "./components/SortDropdown";
import GenreDropdown from "./components/GenreDropdown";

const MoviePage = () => {
  const [query] = useSearchParams();
  const [sortOption, setSortOption] = useState("popularity-desc");
  const [genreOption, setGenreOption] = useState("Options");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const keyword = query.get("q") || ""; // Ensure keyword is not null

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchMovieQuery({ keyword });

  const observer = useRef();

  useEffect(() => {
    const allMovies = data?.pages.flatMap((page) => page.data.results) || [];
    setMovies(allMovies);
  }, [data]);

  useEffect(() => {
    if (movies.length > 0) {
      const filtered = genreOption === "Options"
        ? movies
        : movies.filter((movie) => movie?.genre_ids?.includes(Number(genreOption)));

      const sorted = [...filtered].sort((a, b) => {
        if (sortOption === "popularity-ascending") {
          return a.popularity - b.popularity;
        } else if (sortOption === "popularity-descending") {
          return b.popularity - a.popularity;
        }
        return 0;
      });

      setFilteredMovies(sorted);
    }
  }, [sortOption, genreOption, movies]);

  const lastMovieRef = useCallback(
    (node) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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

  return (
    <div className="grid md:grid-cols-[335px_1fr]">
      <div className="pl-12 pt-5 max-md:pr-12">
        <SortDropdown
          options={["Popularity Descending", "Popularity Ascending"]}
          setSortOption={setSortOption}
        />
        <GenreDropdown setGenreOption={setGenreOption} />
      </div>

      <div>
        {filteredMovies.length > 0 ? (
          <div className="px-8 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4">
            {filteredMovies.map((movie, index) => {
              const isLastElement = index === filteredMovies.length - 1;
              return (
                <div ref={isLastElement ? lastMovieRef : null} key={movie.id}>
                  <MovieCard movie={movie} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full text-center my-10">
            Your search for "{keyword}" did not have any matches.
          </div>
        )}
        {isFetchingNextPage && (
          <div className="text-center py-4">
            <BeatLoader color="#14c6b3" size={15} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
