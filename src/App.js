/** @format */

import React from "react";
import "./assets/css/base/variables.css";
import "./assets/css/base/reset.css";
import "./assets/css/base/helper.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./store/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";
import store from "./store/store";
import { useSelector } from "react-redux";

import Navbar from "./sections/sidebar";
import Header from "./sections/header";
import ExercisesList from "./pages/project-list";
import TimeLine from "./pages/timeline";
import ViewProject from "./pages/view-project";
import TestPage from "./pages/testpage";

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
			<section className="pageContainer">
				<Switch>
					<Route exact path="/" component={ExercisesList} />
					<Route exact path="/timeline" component={TimeLine} />
					<Route path="/view/:id" component={ViewProject} />
					<Route path="/test" component={TestPage} />
				</Switch>
			</section>
		</Router>
	);
}

export default App;
