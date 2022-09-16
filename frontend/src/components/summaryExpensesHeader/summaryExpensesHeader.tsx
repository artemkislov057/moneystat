import React from "react";
import { DividingLine } from "../dividingLine/dividingLine";
import './summaryExpensesHeader.css';

type TProps = {
    title: string
}

export const SummaryExpensesHeader:React.FC<TProps> = React.memo((props) => {
    return <div className="summary-expenses-header">
        <span className="summary-expenses-header-title">
            {props.title}
        </span>
        <DividingLine color="gray"/>
    </div>
})