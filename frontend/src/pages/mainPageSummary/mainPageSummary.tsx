import React from "react";
import { InfoSummaryContainer } from "../../components/infoSummaryContainer/infoSummaryContainer";
import './mainPageSummary.css';

export const MainPageSummary:React.FC = () => {
    return <div className="main-page-summary-container">
        <div className="main-page-summary-money-summary">
            <InfoSummaryContainer 
                title="Расходы"
                type="button expenses"
                value="7,534.55 ₽"
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
            />
        </div>
        
    </div>
}