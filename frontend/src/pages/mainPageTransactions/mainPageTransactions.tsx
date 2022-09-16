import React, { useState } from "react";
import { TransactionInfoContainer } from "../../components/transactionInfoContainer/transactionInfoContainer";
import { TransactionsContainer } from "../../components/transactionsContainer/transactionsContainer";
import './mainPageTransactions.css';
import { TransactionType } from "../../types/types";

export const MainPageTransactions:React.FC = () => {
    const [activeTransactionGroup, setActiveTransactionGroup] = useState<TransactionType>('income');

    function changeActiveTransactionGroup(e: TransactionType) {
        setActiveTransactionGroup(e)
    }

    return <div className="main-page-transactions-container">
        <TransactionsContainer
            activeTransactionGroup={activeTransactionGroup}
            onChangeActiveTransactionGroup={e => changeActiveTransactionGroup(e)}
        />
        <div className="main-page-transactions-right-part">
            <TransactionInfoContainer
                type="balance"
                totalValue="15473"
            />
            <TransactionInfoContainer
                type={activeTransactionGroup}
                totalValue="2836"
            />
        </div>
    </div>
}