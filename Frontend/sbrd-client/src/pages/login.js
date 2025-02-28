// src/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:9192/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.text();
      if (result === 'Invalid credentials!') {
        setError(result);
      } else {
        // Save token and navigate to dashboard or protected page
        localStorage.setItem('token', result);
        navigate('/home');
      }
    } catch (err) {
      setError('Error during login. Please try again.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h3>Login</h3>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  className="form-control" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <div className="mt-3 text-center">
              Don't have an account? <Link to="/">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
