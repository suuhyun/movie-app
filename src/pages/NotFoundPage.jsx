import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center h-screen content-center">
      <h1 className="text-8xl text-[#14c6b3] font-bold mb-5">404</h1>
      <div className="text-lg">
        Oops! The page you're looking for doesn't exist.
      </div>
      <Link to="/">
        <button
          href="/"
          className="m-3 p-2 bg-[#14c6b3] text-black rounded-md m-5"
        >
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
