import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PatientList from "./components/PatientList";
import PatientDetails from "./components/PatientDetails";
import AuthorizationForm from "./components/AuthorizationForm";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <PatientList />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/:id"
            element={
              <PrivateRoute>
                <PatientDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/authorization/:id"
            element={
              <PrivateRoute>
                <AuthorizationForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
