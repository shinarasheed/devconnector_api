import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import dummyavatar from '../../assets/img/avatar.jpg';

const Post = ({ post: { _id, text, user, name, avatar, date } }) => {
  return (
    <article>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link className="text-decoration-none" to={`/profile/${user}`}>
            <img
              className="round-img"
              src={avatar !== '' ? avatar : dummyavatar}
            />
            <h4
              className="text-capitalize font-italic"
              style={{ fontSize: '15px' }}
            >
              {name}
            </h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted <Moment fromNow>{date}</Moment>
          </p>
        </div>
      </div>
    </article>
  );
};

export default Post;
