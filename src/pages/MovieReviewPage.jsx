import React, { useCallback, useRef, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { useMovieReviews } from "../hooks/useMovieReviews";
import { useLocation, useParams } from "react-router-dom";
import ReviewCard from "../common/ReviewCard";

const MovieReviewPage = () => {
  const location = useLocation();
  const { img, title } = location.state;
  const { id } = useParams();
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovieReviews({ id });

  const observer = useRef();

  const lastReviewRef = useCallback(
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

  if (isError) {
    return <div className="text-xl text-red">{error.message}</div>;
  }

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 md:mx-10 md:my-5">
      <div className="relative">
        <img
          src={`https://www.themoviedb.org/t/p/w1280${img}`}
          alt=""
          className="md:col-span-1 max-md:hidden md:px-10"
        />
        <img
          src={`https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${img}`}
          className="md:hidden"
          alt=""
        />
        <div className="absolute md:hidden h-1/2 bg-gradient-to-t from-black to-transparent w-full !z-20 bottom-0"></div>
      </div>
      <div className="md:col-span-3 max-md:mx-8">
        <div className="text-2xl mb-5">{title}</div>
        {data?.pages[0]?.data?.results.length > 0 ? (
          <div className="flex flex-col gap-4">
            {data?.pages.map((page, pageIndex) =>
              page?.data?.results.map((review, index) => {
                const isLastElement =
                  pageIndex === data.pages.length - 1 &&
                  index === page.data.results.length - 1;
                return (
                  <div
                    ref={isLastElement ? lastReviewRef : null}
                    key={review.id}
                  >
                    <ReviewCard review={review} />
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="w-full text-center my-10">
            Your search did not have any matches.
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

export default MovieReviewPage;
