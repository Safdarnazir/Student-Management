// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const NavBar = () => {
// 	return (
// 		<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
// 			<div className="container-fluid">
// 				<Link className="navbar-brand" to={"/"}>
// 					Home
// 				</Link>
// 				<button
// 					className="navbar-toggler"
// 					type="button"
// 					data-bs-toggle="collapse"
// 					data-bs-target="#navbarNav"
// 					aria-controls="navbarNav"
// 					aria-expanded="false"
// 					aria-label="Toggle navigation">
// 					<span className="navbar-toggler-icon"></span>
// 				</button>
// 				<div
// 					className="collapse navbar-collapse"
// 					id="navbarNav">
// 					<ul className="navbar-nav">
// 						<li className="nav-item">
// 							<Link
// 								className="nav-link active"
// 								aria-current="page"
// 								to={"/view-students"}>
// 								Students
// 							</Link>
// 						</li>
// 						<li className="nav-item">
// 							<Link
// 								className="nav-link"
// 								to={"/add-students"}>
// 								Add new Students
// 							</Link>
// 						</li>
// 					</ul>
// 					<ul className="navbar-nav ms-auto">
//                         <li className="nav-item">
//                             <Link
//                                 className="nav-link"
//                                 to={"/signup"}>
//                                 Sign Up
//                             </Link>
//                         </li>
// 						<li className="nav-item">
//                             <Link
//                                 className="nav-link"
//                                 to={"/login"}>
//                                Log In
//                             </Link>
//                         </li>
//                     </ul>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };

// export default NavBar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    // Check for the token in localStorage
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");

        navigate("/login");
    };
    const handleAddStudent=()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login");
        }
         else navigate("/add-students")
    }
    const handleViewStudent=()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login");
        }
         else navigate("/view-students")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>
                    Home
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <button
                         className="nav-link btn btn-link text-light"
                          style={{ cursor: "pointer" }}
                         onClick={handleViewStudent}>
                          Students
                        </button>
                        </li>
                        <li className="nav-item">
                        <button
                         className="nav-link btn btn-link text-light"
                          style={{ cursor: "pointer" }}
                         onClick={handleAddStudent}>
                         Add Students
                        </button>
                        </li>
                    </ul>
                    
                    {/* Conditional rendering based on token */}
                    <ul className="navbar-nav ms-auto">
                        {!token ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                         className="btn btn-success"
										 style={{marginTop:"3px"}}
                                        to={"/signup"}>
                                        Signup
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                         className="btn btn-primary"
										 style={{marginLeft:"2px",marginTop:"3px"}}
                                        to={"/login"}>
                                        Login
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button
                                    className="btn btn-danger"
                                    onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
