import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import {Home, Creator, Classroom, Support} from './pages'
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <main >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/creator" element={<Creator/> } />
          <Route path="/support" element={<Support/> } />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
