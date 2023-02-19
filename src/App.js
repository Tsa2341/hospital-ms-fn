import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Counter from './components/Counter/Counter';
import Landing from './pages/Landing/Landing';
import PageNotFound from './pages/PageNotFound/PageNotFound';

const App = () => (
  <Routes>
    <Route exact path="/" element={<Landing />} />
    <Route path="/counter" element={<Counter />} />
    <Route path="/*" element={<PageNotFound />} />
  </Routes>
);

export default App;
