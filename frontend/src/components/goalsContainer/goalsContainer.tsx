import { Autocomplete, Fab, TextField } from "@mui/material";
import React, { useState } from "react";
import { GolasList as GoalsList } from "../goalsList/goalsList";
import { TwoButtonsSelector } from "../transactionTypeSelector/twoButtonsSelector";
import './goalsContainer.css';

type TProps = {

}

type CategoryGolasType = 'activeGoals' | 'competeGoals'

export const GoalsContainer:React.FC<TProps> = (props) => {
    const [activeCategoryGoals, setActiveCategoryGoals] = useState<CategoryGolasType>('activeGoals');
    function onChangeActiveCategoryGoals(e: CategoryGolasType) {
        setActiveCategoryGoals(e);
    }
    return <div className="goals-container">
        <div className="goals-container-header">
            <span className="goals-container-header-title">Мои цели</span>
            <div className="goals-container-header-create-container">
                <Fab
                    color="primary"
                    sx={{backgroundColor: '#4851FB'}}
                >
                    <span className="goals-container-header-create-icon"></span>
                </Fab>
                <span className="goals-container-header-create-caption">
                    Создать новую цель
                </span>
            </div>
            <Autocomplete
                freeSolo
                options={[]}
                renderInput={(params) => <TextField {...params} label="Найти цель" />}
            />
        </div>
        <TwoButtonsSelector
            titleLeft="Активные"
            titleRight=" Достигнутые"
            activeButton={activeCategoryGoals === 'activeGoals' ? 'left' : 'right'}
            valueLeft="activeGoals"
            valueRight="completeGoals"
            onClick={(e) => onChangeActiveCategoryGoals(e as CategoryGolasType)}
        />
        <GoalsList />
    </div>
}