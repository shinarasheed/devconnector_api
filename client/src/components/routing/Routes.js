import React from 'react';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
import Login from '../auth/Signup';
import Signup from '../auth/Signup';
import NotFound from '../Layouts/NotFound';
import Profiles from '../Layouts/Profiles';
import Alert from '../Layouts/Alert';

const Routes = () => {
  return (
    <>
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} />
          <Route component={NotFound} />
        </Switch>
      </section>
    </>
  );
};

export default Routes;
