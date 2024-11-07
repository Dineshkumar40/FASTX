import React from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import ABusRoute from './components/ABusRoute';
import AdminBusList from './components/AdminBusList';
import Buses from './components/BusList';
import HomePage from './components/HomePage';
import ReservationForm from './components/ReservationForm';
import AuthForm from './components/AuthForm';
import AdminHomePage from './components/AdminHome';

function App() {
  const userRole = localStorage.getItem("RoleType"); 

  return (
    <Router>
      <Routes>     
        <Route path="/" element={<AuthForm />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Buses/:fromLocation/:toLocation/:travelDate/:month" element={<Buses />} />

        <Route
          path="/AdminHome"
          element={userRole === 'admin' ? <AdminHomePage /> : <Navigate to="/access-denied" />}
        />
        
        <Route
          path="/AdminBusList"
          element={userRole === 'admin' ? <AdminBusList /> : <Navigate to="/access-denied" />}
        />
        <Route
          path="/ADminBusRoute"
          element={userRole === 'admin' ? <ABusRoute /> : <Navigate to="/access-denied" />}
        />
        
        <Route path="/ReservationForm/:busId/:seatString/:noOfSeats/:Month" element={<ReservationForm />} />

        <Route path="/access-denied" element={<p className="mx-auto my-auto text-centre">Access Denied: Unauthorized Access</p>
} />
      </Routes>
    </Router>
  );
}

export default App;
