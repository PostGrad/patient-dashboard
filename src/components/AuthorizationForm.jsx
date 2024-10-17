import React, { useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const AuthorizationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    treatmentType: "",
    insurancePlan: "",
    dateOfService: "",
    diagnosisCode: "",
    doctorNotes: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.treatmentType)
      newErrors.treatmentType = "Treatment type is required";
    if (!formData.insurancePlan)
      newErrors.insurancePlan = "Insurance plan is required";
    if (!formData.dateOfService)
      newErrors.dateOfService = "Date of service is required";
    if (!formData.diagnosisCode)
      newErrors.diagnosisCode = "Diagnosis code is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/authorizations`,
        {
          patientId: id,
          ...formData,
        }
      );
      console.log("Authorization submitted:", response.data);

      navigate(`/patient/${id}`);
    } catch (error) {
      console.error("Error submitting authorization:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Prior Authorization Request</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Treatment Type</label>
          <input
            type="text"
            name="treatmentType"
            className={`border p-2 w-full ${
              errors.treatmentType ? "border-red-500" : ""
            }`}
            value={formData.treatmentType}
            onChange={handleChange}
          />
          {errors.treatmentType && (
            <p className="text-red-500 text-sm">{errors.treatmentType}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Insurance Plan</label>
          <input
            type="text"
            name="insurancePlan"
            className={`border p-2 w-full ${
              errors.insurancePlan ? "border-red-500" : ""
            }`}
            value={formData.insurancePlan}
            onChange={handleChange}
          />
          {errors.insurancePlan && (
            <p className="text-red-500 text-sm">{errors.insurancePlan}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Date of Service
          </label>
          <input
            type="date"
            name="dateOfService"
            className={`border p-2 w-full ${
              errors.dateOfService ? "border-red-500" : ""
            }`}
            value={formData.dateOfService}
            onChange={handleChange}
          />
          {errors.dateOfService && (
            <p className="text-red-500 text-sm">{errors.dateOfService}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Diagnosis Code</label>
          <input
            type="text"
            name="diagnosisCode"
            className={`border p-2 w-full ${
              errors.diagnosisCode ? "border-red-500" : ""
            }`}
            value={formData.diagnosisCode}
            onChange={handleChange}
          />
          {errors.diagnosisCode && (
            <p className="text-red-500 text-sm">{errors.diagnosisCode}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Doctor's Notes (Optional)
          </label>
          <textarea
            name="doctorNotes"
            className="border p-2 w-full"
            value={formData.doctorNotes}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit Authorization
        </button>
      </form>

      <Link
        to={`/patient/${id}`}
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        Back to Patient Details
      </Link>
    </div>
  );
};

export default AuthorizationForm;
