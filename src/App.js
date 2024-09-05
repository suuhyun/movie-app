import "./App.css";
import AppLayout from "./layout/AppLayout";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import MoviePage from "./pages/MoviePage/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieReviewPage from "./pages/MovieReviewPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="movies">
          <Route index element={<MoviePage />} />
          <Route path=":id" element={<MovieDetailPage />} />
          <Route path=":id/reviews" element={<MovieReviewPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
