import React from "react";
import { GoalsListItem } from "./goalsListItem";
import './goalsList.css';
import { DividingLine } from "../dividingLine/dividingLine";

type TProps = {

}

export const GolasList:React.FC<TProps> = React.memo((props) => {
    return <div className="goals-list-container">
        <>
            <DividingLine color="lightGray" />
            <GoalsListItem
                completeProgress={30}
                completeSum={120034}
                deadLineDate='17.09.2022'
                isSelected={true}
                titleGoal='Машина'
                totalSum={4500000}
                colorGoal={"green"}
            />
        </>
        <>
            <DividingLine color="lightGray" />
            <GoalsListItem
                completeProgress={10}
                completeSum={120034}
                deadLineDate='17.09.2022'
                isSelected={false}
                titleGoal='Машина'
                totalSum={4500000}
                colorGoal={"pink"}
            />
        </>
        <>
        <DividingLine color="lightGray" />
            <GoalsListItem
                completeProgress={70}
                completeSum={120034}
                deadLineDate='17.09.2022'
                isSelected={false}
                titleGoal='Машина'
                totalSum={4500000}
                colorGoal={"yellow"}
            />
        </>
        <>
            <DividingLine color="lightGray" />
            <GoalsListItem
                completeProgress={30}
                completeSum={120034}
                deadLineDate='17.09.2022'
                isSelected={true}
                titleGoal='Машина'
                totalSum={4500000}
                colorGoal={"green"}
            />
        </>
        <>
            <DividingLine color="lightGray" />
            <GoalsListItem
                completeProgress={10}
                completeSum={120034}
                deadLineDate='17.09.2022'
                isSelected={false}
                titleGoal='Машина'
                totalSum={4500000}
                colorGoal={"pink"}
            />
        </>
        <>
        <DividingLine color="lightGray" />
            <GoalsListItem
                completeProgress={70}
                completeSum={120034}
                deadLineDate='17.09.2022'
                isSelected={false}
                titleGoal='Машина'
                totalSum={4500000}
                colorGoal={"yellow"}
            />
        </>
        <>
            <DividingLine color="lightGray" />
            <GoalsListItem
                completeProgress={30}
                completeSum={120034}
                deadLineDate='17.09.2022'
                isSelected={true}
                titleGoal='Машина'
                totalSum={4500000}
                colorGoal={"green"}
            />
        </>
        <>
            <DividingLine color="lightGray" />
            <GoalsListItem
                completeProgress={10}
                completeSum={120034}
                deadLineDate='17.09.2022'
                isSelected={false}
                titleGoal='Машина'
                totalSum={4500000}
                colorGoal={"pink"}
            />
        </>
        <>
        <DividingLine color="lightGray" />
            <GoalsListItem
                completeProgress={70}
                completeSum={120034}
                deadLineDate='17.09.2022'
                isSelected={false}
                titleGoal='Машина'
                totalSum={4500000}
                colorGoal={"yellow"}
            />
        </>
        <DividingLine color="lightGray" />
    </div>
})