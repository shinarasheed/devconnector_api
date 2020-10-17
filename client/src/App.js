import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Landing from './components/Layouts/Landing';
import Navbar from './components/Layouts/Navbar';
import NotFound from './components/Layouts/NotFound';
import Profiles from './components/Layouts/Profiles';
import Alert from './components/Layouts/Alert';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
