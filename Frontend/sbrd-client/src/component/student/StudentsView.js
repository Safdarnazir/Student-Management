// import React, {
// 	useEffect,
// 	useState,
// } from "react";
// import axios from "axios";
// import {
// 	FaEdit,
// 	FaEye,
// 	FaTrashAlt,
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import Search from "../common/Search";
// import "./StudentView.css"
// const StudentsView = () => {
// 	const [students, setStudents] = useState([]);
// 	const [search, setSearch] = useState("");
//     const navigate = useNavigate();
// 	useEffect(() => {
// 		loadStudents();
// 	}, []);

// 	const loadStudents = async () => {
// 		try {
// 			const result = await axios.get("http://localhost:9192/students/view", {
// 				headers: {
// 					Authorization: `Bearer ${localStorage.getItem('token')}`,
// 				},
// 			});
	
// 			if (result.status === 200) {
// 				setStudents(result.data);
// 			}
// 		} catch (error) {
// 			// Check if the error is due to authentication or authorization
// 			if (error.response && (error.response.status === 401 || error.response.status === 403)) {
// 				// Token might be invalid or expired - navigate to login
// 				navigate("/login");
// 			} else {
// 				// Handle other types of errors (e.g., network issues, server errors)
// 				navigate("/login");
// 			}
// 		}
// 	};
	

// 	const handleDelete = async (id) => {
// 		try {
// 			await axios.delete(`http://localhost:9192/students/delete/${id}`, {
// 				headers: {
// 					Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure auth token is sent
// 				},
// 			});
	
// 			loadStudents(); // Refresh the student list after deletion
// 		} catch (error) {
// 			console.error("Error deleting student:", error.response ? error.response.data : error.message);
// 			alert("Failed to delete the student. Please try again.");
// 		}
// 	};
	

// 	return (
// 		<section>
// 			<Search
// 				search={search}
// 				setSearch={setSearch}
// 			/>
// 			<table className="table table-bordered table-hover shadow">
// 				<thead>
// 					<tr className="text-center">
// 						<th>ID</th>
// 						<th>First Name</th>
// 						<th>Last Name</th>
// 						<th>Email</th>
// 						<th>Depatment</th>
// 						<th colSpan="3">Actions</th>
// 					</tr>
// 				</thead>

// 				<tbody className="text-center">
// 					{students
// 						.filter((st) =>
// 							st.firstName
// 								.toLowerCase()
// 								.includes(search)
// 						)
// 						.map((student, index) => (
// 							<tr key={student.id}>
// 								<th scope="row" key={index}>
// 									{index + 1}
// 								</th>
// 								<td>{student.firstName}</td>
// 								<td>{student.lastName}</td>
// 								<td>{student.email}</td>
// 								<td>{student.department}</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/student-profile/${student.id}`}
// 										className="btn btn-info">
// 										<FaEye />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/edit-student/${student.id}`}
// 										className="btn btn-warning">
// 										<FaEdit />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<button
// 										className="btn btn-danger"
// 										onClick={() =>
// 											handleDelete(student.id)
// 										}>
// 										<FaTrashAlt />
// 									</button>
// 								</td>
// 							</tr>
// 						))}
// 				</tbody>
// 			</table>
// 			<p className="bottom">All rights reserved </p>
// 		</section>
// 	);
// };

// export default StudentsView;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Search from "../common/Search";

const StudentsView = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const result = await axios.get("http://localhost:9192/students/view", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (result.status === 200) {
                setStudents(result.data);
            }
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                navigate("/login");
            } else {
                alert("Facing Error Fetching Data");
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9192/students/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            loadStudents();
        } catch (error) {
            console.error("Error deleting student:", error.response ? error.response.data : error.message);
            alert("Failed to delete the student. Please try again.");
        }
    };

    return (
        <section className="container py-4">
            <Search search={search} setSearch={setSearch} />
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
                {students
                    .filter((st) => st.firstName.toLowerCase().includes(search))
                    .map((student) => (
                        <div className="col" key={student.id}>
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5 className="card-title">{student.firstName} {student.lastName}</h5>
                                    <p className="card-text">
                                        <strong>Email:</strong> {student.email}
                                    </p>
                                    <p className="card-text">
                                        <strong>Department:</strong> {student.department}
                                    </p>
                                    <div className="d-flex justify-content-evenly">
                                        <Link to={`/student-profile/${student.id}`} className="btn btn-info btn-sm">
                                            <FaEye /> View
                                        </Link>
                                        <Link to={`/edit-student/${student.id}`} className="btn btn-warning btn-sm">
                                            <FaEdit /> Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(student.id)}
                                        >
                                            <FaTrashAlt /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <p className="text-center text-muted mt-5">All rights reserved</p>
        </section>
    );
};

export default StudentsView;
