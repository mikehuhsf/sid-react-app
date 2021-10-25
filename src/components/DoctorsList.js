import React, { Component } from "react";
import DoctorListItem from "./DoctorListItem";
import AddDoctor from "./AddDoctor";

export default class DoctorsList extends Component {
  constructor(props) {
    super(props);

    this.state = { doctors: [] };
  }

  componentDidMount() {
    fetch("http://localhost:4000/v1/doctors")
      .then((response) => response.json())
      .then((result) => this.setState({ doctors: result }));
  }

  handleDeleteDoctor(id) {
    const newDoctorsList = this.state.doctors.filter(
      (doctor) => doctor.id !== id
    );

    this.setState({ doctors: newDoctorsList });
  }

  renderDoctors() {
    return this.state.doctors.map((doctor) => (
      <DoctorListItem
        key={doctor.id}
        id={doctor.id}
        name={doctor.name}
        onDeleteDoctor={(id) => this.handleDeleteDoctor(id)}
      ></DoctorListItem>
    ));
  }

  handleAddDoctor(name) {
    const newDoctor = { id: Date.now().toString(), name: name };
    const newDoctorsList = [...this.state.doctors, newDoctor];

    this.setState({ doctors: newDoctorsList });
  }

  render() {
    return (
      <>
        <h2>Doctors List</h2>
        <AddDoctor onAddDoctor={(name) => this.handleAddDoctor(name)} />
        {this.renderDoctors()}
      </>
    );
  }
}
