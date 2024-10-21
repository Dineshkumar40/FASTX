import React from "react";
import Navbar from './components/navbar'; 
import Section from "./components/section";
import Offers from "./components/offers";
import Promo from "./components/Promo";
import Footer from "./components/footer";
function App() {
  return (
    <>
      <Navbar/> 
      <Section/>
      <Offers/>
      <Promo/>
      <Footer/>

    </>
  );
}

export default App;
