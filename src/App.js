import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Examples from './components/Examples'

//TODO create a child component that will call postMessageToWorker
function App() {

  return (
    <HashRouter>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Examples" element={<Examples/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
