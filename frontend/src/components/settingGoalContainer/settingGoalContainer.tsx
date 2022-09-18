import { Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CreateGoalContainer } from "./createGoalContainer";
import './settingGoalContainer.css';

type TProps = {

}

export const SettingGoalContainer:React.FC<TProps> = (props) => {
    return <div className="setting-goal-container">
        <CreateGoalContainer
            type="create"
        />
    </div>
}