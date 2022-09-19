import { Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CreateGoalContainer } from "./createGoalContainer";
import './settingGoalContainer.css';

type TProps = {

}

export const SettingGoalContainer:React.FC<TProps> = (props) => {
    return <div className="setting-goal-container">
        {/* <CreateGoalContainer
            type="create"
        /> */}
        <CreateGoalContainer
            type="edit"
            data={{
                caption: 'aaa',
                currentSum: '23487',
                date: '10.10.2020',
                goalColor: 'green',
                title: 'dfhsdf',
                totalSum: '447473377'
            }}
        />
    </div>
}