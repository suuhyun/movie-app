import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieReviews = ({ id, page = 1 }) => {
  return api.get(`/movie/${id}/reviews?page=${page}`);
};

export const useMovieReviews = ({ id }) => {
  return useInfiniteQuery({
    queryKey: ["movie-review", id],
    queryFn: ({ pageParam = 1 }) => fetchMovieReviews({ id, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.page;
      const totalPages = lastPage.data.total_pages;
      if (currentPage + 1 === totalPages) {
        return undefined;
      }
      return currentPage + 1;
    },
  });
};
