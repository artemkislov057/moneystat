import React from "react";
import { GoalColorsType } from "../../types/types";

type TProps = {
    isSelected: boolean
    titleGoal: string
    completeProgress: number
    totalSum: number
    completeSum: number
    deadLineDate: string
    colorGoal: GoalColorsType
}

export const GoalsListItem:React.FC<TProps> = React.memo((props) => {
    return <div className="goals-list-item-container">
        <div className="goals-list-item-left-part">
            <span className={`goals-list-item-left-part-selected-line ${props.isSelected ? 'active' : ''}`}></span>
            <div className="goals-list-item-left-part-title-progress-container">
                <span className="goals-list-item-left-part-title">
                    {props.titleGoal}
                </span>
                <div className="goals-list-item-left-part-progress-container">
                    <span 
                        className={`goals-list-item-left-part-progress-complete-part ${props.colorGoal}`}
                        style={{width: props.completeProgress + '%'}}
                    ></span>
                </div>
            </div>
        </div>
        <div className="goals-list-item-right-part">
            <span className="goals-list-item-right-part-deadline-date">до {props.deadLineDate}</span>
            <div className="goals-list-item-right-part-sum-info">
                <span className="goals-list-item-right-part-sum complete">{props.completeSum}₽</span>
                из
                <span className="goals-list-item-right-part-sum total">{props.totalSum}₽</span>
            </div>
        </div>
    </div>
})