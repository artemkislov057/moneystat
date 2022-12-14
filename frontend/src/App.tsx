import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { MainPageGoals } from './pages/mainPageGoals/mainPageGoals';
import { MainPageSummary } from './pages/mainPageSummary/mainPageSummary';
import { MainPageTransactions } from './pages/mainPageTransactions/mainPageTransactions';
import { StartPage } from './pages/startPage/startPage';
import { LeftMenu } from './components/leftMenu/leftMenu';
import { SectionType } from './types/types';
import './App.css';
import { WindowSizeContext } from './context/windowSizeContext';

function App() {
  const naviagtor = useNavigate();
  const [activePart, setActivePart] = useState<SectionType>('summary');
  const [currentWindowWidth, setCurrentWindowWidth] = useState<number>(window.visualViewport.width);

  useEffect(() => {
    window.visualViewport.onresize = e => {
      //@ts-ignore
      setCurrentWindowWidth(e.target.width);
    }
  }, [])

  useEffect(() => {
    naviagtor('/summary');
  }, [])
  
  useEffect(() => {
    if((document.location.pathname.substring(1)) as SectionType) {
      setActivePart(document.location.pathname.substring(1) as SectionType)
    }
  }, [document.location.pathname])

  function openSummary() {
    naviagtor('/summary');
    setActivePart('summary');
  }

  function openTransaction() {
    naviagtor('/transactions');
    setActivePart('transactions');
  }

  function openGoals() {
    naviagtor('/goals');
    setActivePart('goals');
  }

  return (
    <div className="App">
      <WindowSizeContext.Provider value={{windowWidth: currentWindowWidth}}>
        {document.location.pathname !== '/' && 
          <LeftMenu
            onClickSummary={openSummary} 
            onClickTransactions={openTransaction}
            onClickGoals={openGoals}
            activeButton={activePart}
          />
        }
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
      </WindowSizeContext.Provider>
    </div>
  );
}

export default App;
