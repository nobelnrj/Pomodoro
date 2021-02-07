import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import './assets/css/base/reset.css';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./parts/sidebar"
import ExercisesList from "./pages/exercises-list";
import EditExercise from "./pages/edit-exercise";
import CreateExercise from "./pages/create-exercise";
import CreateUser from "./pages/create-user";

function App() {
  return (
    <Router>
      <Navbar />
      <section className="pageContainer">
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </section>
    </Router>
  );
}

export default App;
