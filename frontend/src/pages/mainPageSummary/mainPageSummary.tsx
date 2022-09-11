import React, { useState } from "react";
import { AddTransactionModal } from "../../components/addTransactionModal/addTransactionModal";
import { BarChart } from "../../components/barChart/barChart";
import { ExpensesCategoryContainer } from "../../components/expensesCategoryContainer/expensesCategoryContainer";
import { InfoSummaryContainer } from "../../components/infoSummaryContainer/infoSummaryContainer";
import { MainExpenses } from "../../components/mainExpenses/mainExpenses";
import './mainPageSummary.css';

export const MainPageSummary:React.FC = () => {
    const [showModalExpenses, setShowModalExpenses] = useState<boolean>(false);
    const [showModalIncome, setShowModalIncome] = useState<boolean>(false);

    function closeModal() {
        setShowModalExpenses(false);
        setShowModalIncome(false);
    }

    return <div className="main-page-summary-container">
        <div className="main-page-summary-money-summary">
            <InfoSummaryContainer 
                title="Расходы"
                type="button expenses"
                value="7,534.55 ₽"
                onClick={() => setShowModalExpenses(true)}
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
                onClick={() => setShowModalIncome(true)}
            />
        </div>
        <div className="main-page-summary-chart-summary">
            <BarChart />
        </div>
        <div className="main-page-summary-expenses-container">
            <MainExpenses />
            <ExpensesCategoryContainer />
        </div>
        <AddTransactionModal
            isOpen={showModalExpenses}
            closeModal={closeModal}
            type={"expenses"}
        />
        <AddTransactionModal
            isOpen={showModalIncome}
            closeModal={closeModal}
            type={"income"}
        />
    </div>
}