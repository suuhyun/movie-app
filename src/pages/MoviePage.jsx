import React, { useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import MovieCard from "../common/MovieCard";
import { useSearchMovieQuery } from "../hooks/useSearchMovie";

const MoviePage = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q");

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

  const lastMovieRef = useCallback(
    (node) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver((entries) => {
        console.log(hasNextPage)
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

  return (
    <div>
      <div className="px-8 grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
        {data?.pages?.map((page, pageIndex) =>
          page?.data?.results?.map((movie, index) => {
            const isLastElement =
              pageIndex === data.pages.length - 1 &&
              index === page.data.results.length - 1;
            if (isLastElement) {
              return (
                <div ref={lastMovieRef} key={movie.id}>
                  <MovieCard movie={movie} />
                </div>
              );
            }
            return <MovieCard movie={movie} key={movie.id} />;
          })
        )}
      </div>
      {isFetchingNextPage && (
        <div className="text-center py-4">
          <BeatLoader color="#14c6b3" size={15} />
        </div>
      )}
    </div>
  );
};

export default MoviePage;
