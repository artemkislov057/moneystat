import React from "react";
import { GoalColorsType } from "../../types/types";

type TProps = {
    color: GoalColorsType
}

export const SelectColorItem:React.FC<TProps> = (props) => {
    return <div className={`select-color-item ${props.color}`}></div>
}