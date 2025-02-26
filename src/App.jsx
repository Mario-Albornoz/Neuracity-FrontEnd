import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import {Home, Quizzes,Creator, Classroom, Support} from './pages'
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <main >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Classroom/>}/>
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/creator" element={<Creator/> } />
          <Route path="/support" element={<Support/> } />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
