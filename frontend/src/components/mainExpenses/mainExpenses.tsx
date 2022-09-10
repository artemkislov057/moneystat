import React from "react";
import { SummaryExpensesHeader } from "../summaryExpensesHeader/summaryExpensesHeader";
import { DoughnutChart } from "./doughnutChart";
import './mainExpenses.css';

type TProps = {

}

export const MainExpenses:React.FC<TProps> = (props) => {
    return <div className="main-expenses-container">
        <SummaryExpensesHeader 
            title="Основные расходы"
        />
        <div className="main-expenses-show-container">
            <span>Показать за Март</span>
            <span>Все категории</span>
        </div>
        <div className="main-expenses-chart">
            <DoughnutChart />
        </div>
    </div>
}