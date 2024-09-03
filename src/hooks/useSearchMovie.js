import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page = 1 }) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}`)
    : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword }) => {
  return useInfiniteQuery({
    queryKey: ["movie-search", keyword],
    queryFn: ({ pageParam = 1 }) =>
      fetchSearchMovie({ keyword, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.page;
      const totalPages = lastPage.data.total_pages; 
      if (currentPage + 2 === totalPages) {
        return undefined;
      }
      return currentPage + 1;
    },
  });
};
