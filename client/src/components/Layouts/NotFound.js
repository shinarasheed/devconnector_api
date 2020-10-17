import React from 'react';

const NotFound = () => {
  return (
    <section className="container text-center">
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"></i> Page Not Found!
      </h1>
      <p className="large">Sorry, This page does not exist</p>
    </section>
  );
};

export default NotFound;
