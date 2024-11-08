import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ABusRoute from './components/ABusRoute';
import AdminBusList from './components/AdminBusList';
import AdminHomePage from './components/AdminHome';
import AuthForm from './components/AuthForm';
import Buses from './components/BusList';
import HomePage from './components/HomePage';
import ReservationForm from './components/ReservationForm';
import UserViewBookings from './components/UserViewBooking';

function App() {
  const userRole = localStorage.getItem("RoleType"); 

  return (
    <Router>
      <Routes>     
        <Route path="/" element={<AuthForm />} />
        <Route path="/HomePage" element={ userRole === 'User' ? <HomePage /> :<Navigate to="/access-denied" /> } />
        <Route path="/Buses/:fromLocation/:toLocation/:travelDate/:month" element={<Buses />} />

        <Route
          path="/AdminHome"
          element={userRole === 'Administrator' ? <AdminHomePage /> : <Navigate to="/access-denied" />}
        />
        
        <Route
          path="/AdminBusList"
          element={userRole === 'Administrator' ? <AdminBusList /> : <Navigate to="/access-denied" />}
        />
        <Route
          path="/ADminBusRoute"
          element={userRole === 'Administrator' ? <ABusRoute /> : <Navigate to="/access-denied" />}
        />
        
        <Route path="/ReservationForm/:busId/:seatString/:noOfSeats/:Month" element={ userRole === 'User' ? <ReservationForm /> : <Navigate to="/access-denied" />} />

        <Route path="/UserViewBooking" 
        element = {userRole ==='User' ? <UserViewBookings/> :  <Navigate to="/access-denied" /> }
        />

        <Route path="/access-denied" element={<p className="mx-auto my-auto text-centre">Access Denied: Unauthorized Access</p>
} />
      </Routes>
    </Router>
  );
}

export default App;
