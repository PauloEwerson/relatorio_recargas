import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Layout,
} from './pages';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Layout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
