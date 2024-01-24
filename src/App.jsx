import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Checkout from './page/Checkout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
