import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Welcome Section */}
	  
	  <div
        className="text-center my-4"
        style={{
          backgroundImage: "url('/gradute.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          padding: "100px 0",
          color: "#fff",
        }}
      >
        <h1>Welcome to Student Management</h1>
        <p className="lead">
          Effortlessly manage your students, track their progress, and stay organized!
        </p>
      </div>

      {/* Features Section */}
      <div className="container" id="features">
        <div className="row text-center">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Student Records</h5>
                <p className="card-text">
                  Keep all student information organized in one place.
                </p>
                <Link to="/view-students" className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Add New Students</h5>
                <p className="card-text">
                  Easily add new students with a user-friendly interface.
                </p>
                <Link to="/add-students" className="btn btn-success">
                  Add Students
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Progress Tracking</h5>
                <p className="card-text">
                  Monitor students' academic progress effectively.
                </p>
                <Link to="/progress" className="btn btn-warning text-white">
                  Track Progress
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-5">
        <p className="mb-0">&copy; 2025 Student Management. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
