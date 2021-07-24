import React, { Component } from "react";
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
      username: "",
      birthdate: new Date(),
      contact: "",
      vaccinename: "none",
      vaccine1: false,
      vaccine2: false,
      vac1disable: true,
      vac2disable: true,
      //   isChecked1:false,
      //   isChecked2:false,
    };
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
    //as soon as we submit the exercise it will redirect the user to the main window
    window.location = "/";
  }
  //   validate(){

  //   }
  render() {
    return (
      <div>
        <h3>Create a New user</h3>
        <form onSubmit={this.Submit}>
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
                onChangeRaw={this.handleDateChangeRaw}
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
              ref="userInput"
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
              value="Create User Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
