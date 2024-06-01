import Loadable from 'react-loadable';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import { Header } from './components/Header';
import './scss/app.scss';




function App() {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;
