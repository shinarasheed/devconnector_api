import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Landing from './components/Layouts/Landing';
import Navbar from './components/Layouts/Navbar';
import NotFound from './components/Layouts/NotFound';
import Profiles from './components/Layouts/Profiles';
import Alert from './components/Layouts/Alert';
import { loadUser } from './actions/auth';
import setAuthtoken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import store from './store';
import { Provider } from 'react-redux';
import CreateProfile from './components/profile/CreateProfile';
import ProtectedRoute from './components/ProtectedRoute';
import AddEducation from './components/profile/addEducation';
import AddExperience from './components/profile/addExperience';
import EditProfile from './components/profile/EditProfile';
import PostList from './components/posts/PostList';
import PostForm from './components/posts/PostForm';
import SinglePost from './components/posts/SinglePost';
import { LOG_OUT } from './actions/types';

if (localStorage.token) {
  setAuthtoken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOG_OUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Signup} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/profiles" component={Profiles} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute
            exact
            path="/add-education"
            component={AddEducation}
          />
          <ProtectedRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
          <ProtectedRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <ProtectedRoute exact path="/edit-profile" component={EditProfile} />
          <ProtectedRoute exact path="/add-post" component={PostForm} />
          <ProtectedRoute exact path="/posts" component={PostList} />
          <ProtectedRoute exact path="/post/:postId" component={SinglePost} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
