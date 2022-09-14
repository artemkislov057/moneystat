import React from "react";
import { MoneyInput } from "../../components/moneyInput/moneyInput";
import { TestDiagram } from "../../components/testDiagram/testDiagram";
import { TransactionsContainer } from "../../components/transactionsContainer/transactionsContainer";
import './mainPageTransactions.css';

export const MainPageTransactions:React.FC = () => {
    return <div className="main-page-transactions-container">
        <TransactionsContainer />
        <TransactionsContainer />
    </div>
}