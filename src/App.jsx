import React from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TurfList from './components/TurfList';
import TurfDetails from './components/TurfDetails';
import SlotBooking from './components/SlotBooking';
import ThankYou from './components/ThankYou';
import Header from './components/Header';
import PageNotFound from './components/PageNotFound';

const App = () => {
  return <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<TurfList/>} />
        <Route path="/turf/:turfId" element={<TurfDetails/>} />
        <Route path="/book/:turfId" element={<SlotBooking/>} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    </>
};

export default App;

