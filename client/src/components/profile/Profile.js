import React from 'react';
import { Link } from 'react-router-dom';
import profile from '../../reducers/profile';
import dummyaavater from '../../assets/img/avatar.jpg';

const Profile = ({ profile: { user, status, company, location, skills } }) => {
  return (
    <div className="profile bg-light">
      <div style={{ width: '200px' }}>
        <img className="round-img" src={dummyaavater} alt="avatar" />
      </div>
      <div>
        <h2 className="text-capitalize">{user !== null && user.name}</h2>
        <p>
          {status} at {company}
        </p>
        <p>{location}</p>
        <Link to="/profile" className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.map((skill, index) => (
          <li key={index} className="text-primary text-uppercase">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
