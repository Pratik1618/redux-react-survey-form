import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Premises from './Forms/premises'
import Survey from './Forms/survey';

function App() {


  return (
    <Router>
    {/* Set up the routing for your app */}
    <Routes>
      {/* Define routes here */}
      <Route path="/Survey" element={<Survey />} /> {/* Home route */}
      <Route path="/premises" element={<Premises/>} /> {/* Premises route */}
 {/* About route (optional) */}
      
      {/* Add a fallback route (for 404 or undefined routes) */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  </Router>
  )
}

export default App
