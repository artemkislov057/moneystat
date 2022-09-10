import React from "react";
import { BarChart } from "../../components/barChart/barChart";
import { InfoSummaryContainer } from "../../components/infoSummaryContainer/infoSummaryContainer";
import './mainPageSummary.css';

export const MainPageSummary:React.FC = () => {
    return <div className="main-page-summary-container">
        <div className="main-page-summary-money-summary">
            <InfoSummaryContainer 
                title="Расходы"
                type="button expenses"
                value="7,534.55 ₽"
                onClick={() => console.log('add expenses')}
            />
            <InfoSummaryContainer 
                title="Баланс"
                type="info"
                value="15,028.55 ₽"
            />
            <InfoSummaryContainer 
                title="Доходы"
                type="button income"
                value="22,562.55 ₽"
                onClick={() => console.log('add income')}
            />
        </div>
        <BarChart />
        
    </div>
}