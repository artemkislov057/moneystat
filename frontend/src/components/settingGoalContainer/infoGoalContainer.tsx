import { Button, Fab, TextField } from "@mui/material";
import React from "react";
import { GoalColorsType } from "../../types/types";
import { DoughnutChart } from "./chart";
import { TitleGoalContainer } from "./titleGoalContainer";

type TProps = {
    goalName: string
    date: string
    caption: string
    goalColor: GoalColorsType
    totalSum: string
    currentSum: string
    onClickEdit: () => void
}

export const InfoGoalContainer:React.FC<TProps> = (props) => {
    return <div className="info-goal-container">
        <div className="info-goal-container-header">
            <TitleGoalContainer value={'Моя цель'} />
            <span className="info-goal-container-header-goal-name">{props.goalName}</span>
            <span className="info-goal-container-header-date">До {props.date}</span>
        </div>
        <DoughnutChart
            goalColor={props.goalColor}
            totalSum={props.totalSum}
            currentSum={props.currentSum}
        />
        <div className="info-goal-container-caption-container">
            <TextField
                label={'Описание цели'}
                fullWidth
                value={props.caption}
                InputProps={{
                    readOnly: true
                }}
                multiline
                sx={{
                    // maxHeight: 70,
                    height: '100%',
                }}
            />
            <div className="info-goal-container-caption-container-fab-container">
                <Fab
                    sx={{border: '1px solid #4851FB', backgroundColor: 'transparent', color: '#4851FB'}}
                >
                    <span className="info-goal-container-caption-container-fab-icon add"></span>
                </Fab>
                <span className="info-goal-container-caption-container-fab-caption">Добавить накопленную сумму</span>
            </div>
            <div className="info-goal-container-caption-container-fab-container">
                 <Fab
                    sx={{border: '1px solid #4851FB', backgroundColor: 'transparent', color: '#4851FB'}}
                >
                    <span className="info-goal-container-caption-container-fab-icon complete"></span>
                </Fab>
                <span className="info-goal-container-caption-container-fab-caption">Отметить цель как достигнутую</span>            
            </div>            
        </div>
        <div className="info-goal-container-edit-button-container">
            <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={() => props.onClickEdit()}
            >
                Редактировать цель
            </Button>
        </div>
    </div>
}