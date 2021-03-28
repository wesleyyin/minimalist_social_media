import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Login from "./components/login.component";
import Feed from "./components/feed.component";
import UserProfile from "./components/user-profile.component";
import UserSearch from "./components/user-search.component";
import NewPost from "./components/new-post.component";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <div className = "container">
          <Navbar />
          <br/>
          <Route path = "/feed" exact component = {Feed} />
          <Route path = "/profiles/:username" exact component = {UserProfile} />
          <Route path = "/search" exact component = {UserSearch} />
          <Route path = "/new_post" exact component = {NewPost} />
      </div>
      </Switch>
      
      
    </Router>
  );
}

export default App;