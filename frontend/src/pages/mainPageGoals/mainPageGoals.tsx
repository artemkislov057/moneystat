import React from "react";
import { GoalsContainer } from "../../components/goalsContainer/goalsContainer";
import './mainPageGoals.css';

export const MainPageGoals:React.FC = () => {
    return <div className="main-page-goals-container">        
        <GoalsContainer />
        <GoalsContainer />
    </div>
}