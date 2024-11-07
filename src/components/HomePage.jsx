import React from 'react'
import Navbar from './navbar'
import Section from './section'
import Offers from './offers'
import Promo from './Promo'
import Footer from './footer'
// import AdminHomePage from './AdminHome'


function HomePage() {
  return (
    <>
      <Navbar/>
      <Section/>
      <Offers/>
      <Promo/>
      {/* <AdminHomePage/> */}
      <Footer/>
    </>
  )
}

export default HomePage
