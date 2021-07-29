import React from 'react';
import './assets/css/base/variables.css';
import './assets/css/base/reset.css';
import "./assets/css/base/helper.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./store/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";
import store from "./store/store";

import Navbar from "./sections/sidebar";
import Header from "./sections/header";
import Login from "./auth/login";
import Register from  "./auth/register";
import ExercisesList from "./pages/project-list";
import EditExercise from "./pages/edit-exercise";
import CreateExercise from "./pages/create-exercise";
import CreateUser from "./pages/create-user";
import PrivateRoute from "./components/Private-route/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Router>
      <Navbar />
      <Header />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <section className="pageContainer">
        <Switch>
          <PrivateRoute exact path="/" component={ExercisesList} />
          <PrivateRoute path="/edit/:id" component={EditExercise} />
          <PrivateRoute path="/create" component={CreateExercise} />
          <PrivateRoute path="/user" component={CreateUser} />
        </Switch>
      </section>
    </Router>
  );
}

export default App;
