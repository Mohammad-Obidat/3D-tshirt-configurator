import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Customizer from './pages/Customizer.tsx';
import Layout from './components/Layout.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/customizer' element={<Customizer />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
