import React, { useState, useEffect } from "react";
import PatientListItem from "./PatientListItem";

const PatientsList = () => {
  const [patients, setPatients] = useState(null);

  const fetchPatients = () => {
    fetch("https://morning-sands-55044.herokuapp.com/v1/patients")
      .then((response) => response.json())
      .then((result) => setPatients(result));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <>
      <h2>Patients List</h2>
      {patients &&
        patients.map((patient) => (
          <PatientListItem key={patient.id} patient={patient} />
        ))}
    </>
  );
};

export default PatientsList;
