import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfile } from '../../actions/profile';
import Spinner from '../Layouts/Spinner';
import Education from '../profile/Education';
import Experience from '../profile/Experience';
import { deleteProfile } from '../../actions/profile';

const Dashboard = ({
  user,
  getProfile,
  deleteProfile,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  if (loading && profile === null) {
    return <Spinner />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
            <Link to="/add-experience" className="btn btn-light">
              <i className="fab fa-black-tie text-primary"></i> Add Experience
            </Link>
            <Link to="/add-education" className="btn btn-light">
              <i className="fas fa-graduation-cap text-primary"></i> Add
              Education
            </Link>
            <Link to="/add-post" className="btn btn-light">
              <i className="fas fa-blog text-primary"></i> Create Post
            </Link>
          </div>

          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={(e) => deleteProfile()}>
              <i className="fas fa-user mr-2"></i>
              Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet created a profile, please create a profile</p>
          <Link to="/create-profile" className=" btn btn-primary my-1 ">
            Create profile
          </Link>
        </>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object.isRequired,
  deleteProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile, deleteProfile })(
  Dashboard
);
