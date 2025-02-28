import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    age: "",
    studentClass: "",
    grades: ""
  });

  const { firstName, lastName, email, department, age, studentClass, grades } = student;

  const handleInputChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const saveStudent = async (e) => {
    e.preventDefault();
    try {
    //   await axios.post("http://localhost:9192/students", student);
	await axios.post("http://localhost:9192/students", student, {
		headers: {
		  Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	  });	  
      navigate("/view-students");
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5">Add Student</h2>
      <form onSubmit={saveStudent}>
        {/* First Name */}
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="firstName">
            First Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="firstName"
            id="firstName"
            required
            value={firstName}
            onChange={handleInputChange}
          />
        </div>
        
        {/* Last Name */}
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="lastName"
            id="lastName"
            required
            value={lastName}
            onChange={handleInputChange}
          />
        </div>

        {/* Email */}
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="email">
            Email
          </label>
          <input
            className="form-control col-sm-6"
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={handleInputChange}
          />
        </div>

        {/* Department */}
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="department">
            Department
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="department"
            id="department"
            required
            value={department}
            onChange={handleInputChange}
          />
        </div>

        {/* Age */}
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="age">
            Age
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="age"
            id="age"
            required
            value={age}
            onChange={handleInputChange}
          />
        </div>

        {/* Class (studentClass) */}
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="studentClass">
            Class
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="studentClass"
            id="studentClass"
            required
            value={studentClass}
            onChange={handleInputChange}
          />
        </div>

        {/* Grades */}
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="grades">
            Grades
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="grades"
            id="grades"
            value={grades}
            onChange={handleInputChange}
          />
        </div>

        {/* Buttons */}
        <div className="row mb-5">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>
          <div className="col-sm-2">
            <Link
              to="/view-students"
              className="btn btn-outline-warning btn-lg"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
