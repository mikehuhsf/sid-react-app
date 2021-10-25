import React, { useState } from "react";

const PatientListItem = ({ patient }) => {
  const [doctorsList, setDoctorsList] = useState(null);

  const GQL_API = `https://fast-thicket-68951.herokuapp.com/`;//`http://localhost:3030/`;
  const GQL_QUERY = `
    query($id: ID!){
      patient(id: $id){
        doctors{
          id
          name
        }
      }
    }`;

  const handleLoadDoctors = () => {
    const variables = { id: patient.id };
    fetch(GQL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GQL_QUERY,
        variables,
      }),
    })
      .then((response) => response.json())
      .then((result) => setDoctorsList(result.data.patient.doctors));
  };

  return (
    <div>
      <a href="#" onClick={handleLoadDoctors}>
        {patient.name}
      </a>
      {doctorsList &&
        doctorsList.map((doctor) => {
          return <div key={doctor.id}>{doctor.name}</div>;
        })}
    </div>
  );
};

export default PatientListItem;
