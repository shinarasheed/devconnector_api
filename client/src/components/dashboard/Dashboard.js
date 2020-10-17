import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Dashboard = ({ user }) => {
  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user ? user.name : 'John Doe'}
      </p>
      <p>You have not yet created a profile, please create a profile</p>
      <Link to="/create-profile" className=" btn btn-primary my-1 ">
        Create profile
      </Link>
    </section>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
