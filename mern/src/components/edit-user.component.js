import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker"; //the calender way of selection
import "react-datepicker/dist/react-datepicker.css";

export default class CreateUsers extends Component {
  //we need to call a contructor of props
  constructor(props) {
    super(props);
    //to let react know we are mentioning "this" we need to bind it
    this.onchangeRollNumner = this.onchangeRollNumner.bind(this);
    this.onchangeUsername = this.onchangeUsername.bind(this);
    this.onchangeDate = this.onchangeDate.bind(this);
    this.onchangeContact = this.onchangeContact.bind(this);
    this.onchangeVaccinename = this.onchangeVaccinename.bind(this);
    this.onchangeVaccine1 = this.onchangeVaccine1.bind(this);
    this.onchangeVaccine2 = this.onchangeVaccine2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      rollno: "",
      birthdate: new Date(),
      username: "",
      contact: "",
      vaccinename: "none",
      vaccine1: false,
      vaccine2: false,
      vac1disable: true,
      vac2disable: true,
      //   isChecked1:false,
      //   isChecked2:false,
      error: "",
    };
  }
  //edit
  componentDidMount() {
    axios
      .get("http://localhost:5000/users/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          rollno: response.data.rollno,
          username: response.data.username,
          birthdate: new Date(response.data.birthdate),
          contact: response.data.contact,
          vaccinename: response.data.vaccinename,
          vaccine1: response.data.vaccine1,
          vaccine2: response.data.vaccine2,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onchangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  onchangeRollNumner(event) {
    this.setState({ rollno: event.target.value });
  }
  onchangeContact(event) {
    this.setState({ contact: event.target.value });
  }
  onchangeDate(date) {
    this.setState({ birthdate: date });
  }
  onchangeVaccinename(event) {
    this.setState({ vaccinename: event.target.value });
    if (event.target.value === "none") {
      this.setState({ vac1disable: true });
      this.setState({ vac2disable: true });
      this.setState({ vaccine1: false });
      this.setState({ vaccine2: false });
    } else {
      this.setState({ vac1disable: false });
      this.setState({ vac2disable: true });
      this.setState({ vaccine1: false });
      this.setState({ vaccine2: false });
    }
  }
  onchangeVaccine1(event) {
    this.setState({ vaccine1: event.target.checked });

    if (event.target.checked === true) {
      this.setState({ vac2disable: false });
    } else {
      this.setState({ vac2disable: true });

      this.setState({ vaccine2: false });
    }
  }
  onchangeVaccine2(event) {
    this.setState({ vaccine2: event.target.checked });
  }
  //prevent user input through keyboard
  handleDateChangeRaw = (event) => {
    event.preventDefault();
  };

  onSubmit(event) {
    event.preventDefault(); //prevent default html form submit button to take place
    const user = {
      rollno: this.state.rollno,
      username: this.state.username,
      contact: this.state.contact,
      birthdate: this.state.birthdate,
      vaccinename: this.state.vaccinename,
      vaccine1: this.state.vaccine1,
      vaccine2: this.state.vaccine2,
    };
    console.log(user);
    axios
      .post(
        "http://localhost:5000/users/update/" + this.props.match.params.id,
        user
      )
      .then((res) => {
        console.log(res);
        window.location = "/";
      })
      .catch((err) => console.log(err.message));
    //as soon as we submit the exercise it will redirect the user to the main window
  }
  //   validate(){

  //   }
  render() {
    return (
      <div>
        <h3>Edit user information</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>EnRollment Number</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.rollno}
              onChange={this.onchangeRollNumner}
            ></input>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onchangeUsername}
            ></input>
          </div>
          <div className="form-group">
            <label>BirthDate</label>
            <div>
              <DatePicker
                selected={this.state.birthdate}
                onChange={this.onchangeDate}
                // onChangeRaw={this.handleDateChangeRaw}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.contact}
              onChange={this.onchangeContact}
            ></input>
          </div>
          <div className="form-group">
            <label>Vaccine Name</label>
            <select
              required
              className="form-control"
              value={this.state.vaccinename}
              onChange={this.onchangeVaccinename}
            >
              <option value="none" defaultValue>
                None
              </option>
              <option value="Covishield">Covishield</option>
              <option value="Covaxin">Covaxin</option>
              <option value="Sputnik V">Sputnik V</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              disabled={this.state.vac1disable}
              checked={this.state.vaccine1}
              onChange={this.onchangeVaccine1}
            ></input>
            <span>Did you take Dose 1?</span>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              disabled={this.state.vac2disable}
              checked={this.state.vaccine2}
              onChange={this.onchangeVaccine2}
            ></input>

            <span>Dis you take Dose 2?</span>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit User Log"
              className="btn btn-primary"
            />
          </div>
        </form>
        {/* <div>
          <p>{this.state.error}</p>
        </div> */}
      </div>
    );
  }
}
