import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./table.css";
//import User from "./user.component";

const User = (props) => (
  <tr className="hovering">
    <td>{props.user.rollno}</td>
    <td>{props.user.username}</td>
    <td>{props.user.birthdate.substring(0, 10)}</td>
    <td>{props.user.contact}</td>
    <td>{props.user.vaccinename}</td>
    <td>{props.user.vaccine1 === true ? "Yes" : "No"}</td>
    <td>{props.user.vaccine2 === true ? "Yes" : "No"}</td>
    <td>
      <Link to={"/edit/" + props.user._id}>Edit</Link> |
      <a
        href="#"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = { users: [] };
  }
  //this function loads first
  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteUser(id) {
    axios
      .delete("http://localhost:5000/users/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      users: this.state.users.filter((el) => el._id !== id),
    }); //if for all elements in the user array we are going to return it if
    //the element id is not equal to the id of the delete element
  }
  usersList() {
    //for each  current user we find from all the Users we return a component
    //The component is the row of table We will pass props
    return this.state.users.map((currentuser) => {
      return (
        <User
          user={currentuser}
          deleteUser={this.deleteUser}
          key={currentuser._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h3>Users List</h3>
        <table className="table">
          <thead className="heading">
            <tr>
              <th>Enrollment Number</th>
              <th>Username</th>
              <th>Birthdate</th>
              <th>Contact Number</th>
              <th>Vaccine Name</th>
              <th>Dose 1</th>
              <th>Dose 2</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="elements">{this.usersList()}</tbody>
        </table>
      </div>
    );
  }
}
