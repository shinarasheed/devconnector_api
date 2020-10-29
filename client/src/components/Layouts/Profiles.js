import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import profile from '../../reducers/profile';
import Spinner from '../Layouts/Spinner';
import Profile from '../profile/Profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <>
      {loading && profiles !== null ? (
        <Spinner />
      ) : (
        <section className="container">
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>

          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Profile key={profile._id} profile={profile} />
              ))
            ) : (
              <h4> No Profiles Found</h4>
            )}
          </div>
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
