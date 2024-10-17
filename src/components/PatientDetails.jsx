import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/patients/${id}`
        );
        // const sampleData = {
        //   _id: "1",
        //   name: { first: "John", last: "Doe" },
        //   age: 34,
        //   condition: "Diabetes",
        //   pastTreatments: ["Insulin Therapy", "Blood Sugar Monitoring"],
        //   medicationHistory: ["Metformin", "Lisinopril"],
        //   labResults: ["A1C: 6.5%", "Blood Pressure: 120/80"],
        // };
        // setPatient(sampleData);

        setPatient(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!patient) {
    return <div className="container mx-auto p-4">Patient not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Patient Details: {patient.name.first} {patient.name.last}
      </h1>

      <div className="bg-white p-4 shadow mb-4">
        <p>
          <strong>Age:</strong> {patient.age}
        </p>
        <p>
          <strong>Condition:</strong> {patient.condition}
        </p>
      </div>

      <div className="bg-white p-4 shadow mb-4">
        <h2 className="text-xl font-bold mb-2">Past Treatments</h2>
        {patient.pastTreatments && patient.pastTreatments.length > 0 ? (
          <ul className="list-disc ml-5">
            {patient.pastTreatments.map((treatment, index) => (
              <li key={index}>{treatment}</li>
            ))}
          </ul>
        ) : (
          <p>No past treatments available.</p>
        )}
      </div>

      <div className="bg-white p-4 shadow mb-4">
        <h2 className="text-xl font-bold mb-2">Medication History</h2>
        {patient.medicationHistory && patient.medicationHistory.length > 0 ? (
          <ul className="list-disc ml-5">
            {patient.medicationHistory.map((medication, index) => (
              <li key={index}>{medication}</li>
            ))}
          </ul>
        ) : (
          <p>No medication history available.</p>
        )}
      </div>

      <div className="bg-white p-4 shadow mb-4">
        <h2 className="text-xl font-bold mb-2">Lab Results</h2>
        {patient.labResults && patient.labResults.length > 0 ? (
          <ul className="list-disc ml-5">
            {patient.labResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        ) : (
          <p>No lab results available.</p>
        )}
      </div>

      <Link to="/" className="text-blue-500 hover:underline">
        Back to Patient List
      </Link>
    </div>
  );
};

export default PatientDetails;
