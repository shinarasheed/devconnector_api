import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Login = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={handleOnsubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => handleOnchange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handleOnchange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
