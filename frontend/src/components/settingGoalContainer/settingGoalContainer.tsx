import { Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CreateGoalContainer } from "./createGoalContainer";
import { InfoGoalContainer } from "./infoGoalContainer";
import './settingGoalContainer.css';

type TProps = {
    currentGoalData?: any
    type: 'create' | 'info'
    show: boolean
}

export const SettingGoalContainer:React.FC<TProps> = (props) => {
    return <div className="setting-goal-container">
        {
            props.type === 'create' && props.show ?
            <CreateGoalContainer
                type="create"
            />
            : null
        }
        {
            props.type === 'info' && props.show ?
            <InfoGoalContainer 
                date="25.10.2022"
                goalName="Накопить на машину"
                caption="Тут какое-то описание заметка цели по ширине блок 420, в данном примере а по выосте не больше 60-70, когда становится больше можно "
                goalColor="purple"
                totalSum={'351600'}
                currentSum={'150500'}
                onClickEdit={() => {}}
            />
            : null
        }
        {/* <CreateGoalContainer
            type="edit"
            data={{
                caption: 'aaa',
                currentSum: '23487',
                date: '10.10.2020',
                goalColor: 'green',
                title: 'dfhsdf',
                totalSum: '447473377'
            }}
        /> */}
    </div>
}