import React from "react";
import { useRelatedMoviesQuery } from "../../../hooks/useRelatedMovies";
import { BeatLoader } from "react-spinners";
import MovieSlider from "../../../common/MovieSlider";
import { detailPageSettings } from "../../../utils/slideSettings";

const RecommendationSlide = ({ movieId }) => {
  const { data, isLoading, isError, error } = useRelatedMoviesQuery({
    id: movieId,
  });
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
      <MovieSlider
        title="Recommendations"
        movies={data.results}
        settings={detailPageSettings}
      />
    </div>
  );
};

export default RecommendationSlide;
