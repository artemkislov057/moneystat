import React, { useState } from "react";
import { GoalsContainer } from "../../components/goalsContainer/goalsContainer";
import { SettingGoalContainer } from "../../components/settingGoalContainer/settingGoalContainer";
import './mainPageGoals.css';

export const MainPageGoals:React.FC = () => {
    const [showCreateGoal, setShowCreateGoal] = useState<boolean>(false);

    function openCreateGoalContainer() {
        setShowCreateGoal(true);
    }

    function closeCreateGoalContainer() {
        setShowCreateGoal(false);
    }
    return <div className="main-page-goals-container">        
        <GoalsContainer 
            onClickCreateGoal={openCreateGoalContainer}
        />        
        <SettingGoalContainer
            type="info"
            show={showCreateGoal}
        />        
    </div>
}