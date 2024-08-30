import React from "react";
import "./NotFoundPage.style.css";
import { Container, Button } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <Container className="not-found-container text-center d-flex flex-column justify-content-center vh-100">
      <div className="">
        <h1 className="text-primary">404</h1>
        <div className="lead text-white">
          Oops! The page you're looking for doesn't exist.
        </div>
        <Button variant="primary" type="button" href="/" className="m-3">
          Go to Home
        </Button>
      </div>
    </Container>
  );
};

export default NotFoundPage;
