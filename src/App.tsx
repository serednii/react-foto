import Loadable from 'react-loadable';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import { Header } from './components/Header';
import './scss/app.scss';


import MainLayout from './layouts/MainLayout';
import FullProduct from './pages/FullProduct';
import NotFound from './pages/NotFound';
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route path='' element={<Home />} />
      <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
              {/* <Cart /> */}
            </Suspense>
          }
        />
        <Route
          path="product/:id"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <FullProduct />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
     
    </Routes>
  );
}

export default App;
