import React from "react";
import { Link } from "react-router-dom";
function CoursePage() {
  return (
    <>
      Course Page
      <Link to="/quiz" className="btn btn-success"></Link>
    </>
  );
}
export default CoursePage;
