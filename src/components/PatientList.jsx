import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  /*
[
    {
      _id: "1",
      name: { first: "John", last: "Doe" },
      age: 34,
      condition: "Diabetes",
    },
    {
      _id: "2",
      name: { first: "Jane", last: "Smith" },
      age: 29,
      condition: "Hypertension",
    },
  ]
*/

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/patients`
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    `${patient.name.first} ${patient.name.last}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>

      <input
        type="text"
        placeholder="Search patients..."
        className="border p-2 mb-4 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <table className="table-auto w-full bg-white shadow">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Condition</th>
            <th className="px-4 py-2">Actions</th>{" "}
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient, index) => (
            <tr key={patient._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                {patient.name.first} {patient.name.last}
              </td>
              <td className="border px-4 py-2">{patient.age}</td>
              <td className="border px-4 py-2">{patient.condition}</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/patient/${patient._id}`}
                  className="text-blue-500 hover:underline mr-4"
                >
                  View Details
                </Link>
                <Link
                  to={`/authorization/${patient._id}`}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  Submit PA
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
