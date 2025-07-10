import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import './App.css'

function App() {


  return (
    <>
   
    <Router>
      <Navbar />
      <div >
        <Routes>
          <Route path="/" element={<Home />} />
 
        </Routes>
      </div>
      <Footer />
    </Router>
    </>
  )
}

export default App
