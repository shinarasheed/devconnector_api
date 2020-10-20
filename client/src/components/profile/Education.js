import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
  if (education.length > 0) {
    return (
      <>
        <h2 className="my-2">Education Credentials</h2>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Field Of Study</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {education.map((education) => (
              <tr key={education._id}>
                <td>{education.school}</td>
                <td>{education.degree}</td>
                <td className="hide-sm">{education.fieldofstudy}</td>
                <td className="hide-sm">
                  <Moment format="MMMM YYYY">{education.from}</Moment> -
                  {education.now === '' ? (
                    'Now'
                  ) : (
                    <Moment format="MMMM YYYY">{education.to}</Moment>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => deleteEducation(education._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  return null;
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
