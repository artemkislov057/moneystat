import React from "react";
import { TransactionInfoContainer } from "../../components/transactionInfoContainer/transactionInfoContainer";
import { MoneyInput } from "../../components/moneyInput/moneyInput";
import { TestDiagram } from "../../components/testDiagram/testDiagram";
import { TransactionsContainer } from "../../components/transactionsContainer/transactionsContainer";
import './mainPageTransactions.css';

export const MainPageTransactions:React.FC = () => {
    return <div className="main-page-transactions-container">
        <TransactionsContainer />
        <div className="main-page-transactions-right-part">
            <TransactionInfoContainer
                title="Баланс"
                totalValue="15473"
            />
            <TransactionInfoContainer
                title="Расходы"
                totalValue="2836"
            />
        </div>
    </div>
}