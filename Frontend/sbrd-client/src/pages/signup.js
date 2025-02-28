// src/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9192/auth/signup', user);
      setMessage(response.data);
      // Optionally, redirect to login after signup
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage('Email Address Already Exists Try Login');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h3>Signup</h3>
          </div>
          <div className="card-body">
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  className="form-control" 
                  value={user.email} 
                  onChange={handleInputChange} 
                  required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  className="form-control" 
                  value={user.password} 
                  onChange={handleInputChange} 
                  required />
              </div>
              <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
            <div className="mt-3 text-center">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
