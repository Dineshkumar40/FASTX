import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ABusRoute from './components/ABusRoute';
import AdminBusList from './components/AdminBusList';
import AdminHomePage from './components/AdminHome';
import AuthForm from './components/AuthForm';
import Aviewseats from "./components/Aviewseats";
import Buses from './components/BusList';
import HomePage from './components/HomePage';
import ReservationForm from './components/ReservationForm';
import UserViewBookings from './components/UserViewBooking';

function App() {
  const userRole = useSelector((state) => state.auth);
  const roleType = userRole?.roleType;
  console.log('roleType',roleType)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />

        <Route path="/AdminHome" element={roleType&& roleType=== 'Administrator' ? <AdminHomePage /> : <p > hi </p>} />
        <Route path="/Aviewseats" element={roleType === 'Administrator' ? <Aviewseats /> : <Navigate to="/access-denied" />} />
        <Route path="/AdminBusList" element={roleType === 'Administrator' ? <AdminBusList /> : <Navigate to="/access-denied" />} />
        <Route path="/ADminBusRoute" element={roleType === 'Administrator' ? <ABusRoute /> : <Navigate to="/access-denied" />} />


        <Route path="/HomePage" element={roleType === 'User' ? <HomePage /> : <Navigate to="/access-denied" />} />
        <Route path="/Buses/:fromLocation/:toLocation/:travelDate/:month" element={<Buses />} />
        <Route path="/ReservationForm/:busId/:seatString/:noOfSeats/:Month" element={roleType === 'User' ? <ReservationForm /> : <Navigate to="/access-denied" />} />
        <Route path="/UserViewBooking" element={roleType === 'User' ? <UserViewBookings /> : <Navigate to="/access-denied" />} />


        <Route path="/access-denied" element={<p className="mx-auto my-auto text-center">Access Denied: Unauthorized Access</p>} />
      </Routes>
    </Router>
  );
}

export default App;
