import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="container mt-5 p-5 mb-5">
      <div className="row text-center p-5">
        <h1 className="fs-2">404 Not Found!</h1>
        <p className="text-muted mt-4">
          Oops! Seems like the page you are looking for does not exist!
        </p>
        <Link
        to={'/'}
          className="btn btn-primary fs-5 text-bold p-3 mt-4"
          style={{ width: "30%", margin: "0 auto", fontWeight: "600" }}
        >
          Redirect to Home Page
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
