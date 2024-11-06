import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Navbar from './components/navbar';
// import Section from "./components/section";
// import Offers from "./components/offers";
// import Promo from "./components/Promo";
// import Footer from "./components/footer";
import ABusRoute from './components/ABusRoute';
import AdminBusList from './components/AdminBusList';
import Buses from './components/BusList';
import HomePage from './components/HomePage';
import ReservationForm from './components/ReservationForm';

function App() {
  return (
    <Router>
      <Routes>     
        <Route path="/" element={<HomePage/>} />
        <Route path="/Buses/:fromLocation/:toLocation/:travelDate/:month" element={<Buses />} />
        <Route path="/AdminBusList" element={<AdminBusList/>}/>
        <Route path='/ADminBusRoute' element={<ABusRoute/>}/>
        <Route path='/ReservationForm/:busId/:seatString/:noOfSeats/:Month' element={<ReservationForm />} />
        </Routes>
    </Router>
  );
}

export default App;
