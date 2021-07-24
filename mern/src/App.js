import "./App.css";
//import react router dom
import { BrowserRouter as Router, Route } from "react-router-dom";
//import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import UserList from "./components/user-list.component";
import CreateUser from "./components/create-user.component";
import EditUser from "./components/edit-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={UserList} />
        <Route path="/edit/:id" component={EditUser} />
        <Route path="/create" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
//react router helps in linking to route different urls with different react components
