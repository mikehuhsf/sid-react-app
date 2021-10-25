import React, { useState } from "react";
import PropTypes from "prop-types";
import DoctorDetails from "./DoctorDetails";

function DoctorListItem({ id, name, onDeleteDoctor }) {
  const [details, setDetails] = useState(null);

  function handleLoadDetails() {
    fetch(`http://localhost:5000/v1/doctor/${id}`)
      .then((response) => response.json())
      .then((response) => setDetails(response));
  }

  function handleDeleteDoctor() {
    onDeleteDoctor(id);
  }

  return (
    <div>
      <a href="#" onClick={handleLoadDetails}>
        {name}
      </a>
      <button onClick={handleDeleteDoctor}>X</button>
      {details && <DoctorDetails {...details} />}
    </div>
  );
}

DoctorListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default DoctorListItem;
