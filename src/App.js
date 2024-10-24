import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';import React from "react";
// import Navbar from './components/navbar';
// import Section from "./components/section";
// import Offers from "./components/offers";
// import Promo from "./components/Promo";
// import Footer from "./components/footer";
import Buses from './components/BusList';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Routes>     
        <Route path="/" element={<HomePage/>} />
        <Route path="/Buses/:FromLocation/:ToLocation/:TravelDate" element={<Buses />} />
      </Routes>
    </Router>
  );
}

export default App;
