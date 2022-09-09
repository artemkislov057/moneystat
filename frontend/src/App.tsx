import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { MainPageGoals } from './pages/mainPageGoals/mainPageGoals';
import { MainPageSummary } from './pages/mainPageSummary/mainPageSummary';
import { MainPageTransactions } from './pages/mainPageTransactions/mainPageTransactions';
import { StartPage } from './pages/startPage/startPage';
import './App.css';

function App() {
  const naviagtor = useNavigate();

  useEffect(() => {
    naviagtor('/summary')
  }, [])
  return (
    <div className="App">
        <Routes>
          <Route
            path='/'
            element={<StartPage />}
          />
          <Route
            path='/summary'
            element={<MainPageSummary />}
          />
          <Route
            path='/transactions'
            element={<MainPageTransactions />}
          />
          <Route
            path='/goals'
            element={<MainPageGoals />}
          />
        </Routes>
    </div>
  );
}

export default App;
