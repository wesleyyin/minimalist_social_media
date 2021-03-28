import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercises from "./components/edit-exercises.component";
import CreateExercises from "./components/create-exercises.component";
import CreateUsers from "./components/create-user.component";
function App() {
  return (
    <Router>
      <div className = "container">
        <Navbar />
        <br/>
        <Route path = "/" exact component = {ExercisesList} />
        <Route path = "/edit/:id" exact component = {EditExercises} />
        <Route path = "/create" exact component = {CreateExercises} />
        <Route path = "/user" exact component = {CreateUsers} />
      </div>
      
    </Router>
  );
}

export default App;
