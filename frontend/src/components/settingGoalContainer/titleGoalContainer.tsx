import React from "react";

type TProps = {
    value: string
}

export const TitleGoalContainer:React.FC<TProps> = (props) => {
    return <div className="title-goal-container">
        {props.value}
    </div>
}