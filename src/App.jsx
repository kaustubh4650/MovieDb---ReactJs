import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TopRatedPage from './pages/TopRatedPage';
import UpcomingPage from './pages/UpcomingPage';
import SearchResultsPage from './pages/SearchResultsPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import Navbar from './components/Navbar';
import "./App.css"

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/search/:query" element={<SearchResultsPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
