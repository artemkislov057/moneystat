import React from "react";
import { BalanceLineChart } from "./balanceLineChart";
import { TransactionBarChart } from "./transactionBarChart";
import './transactionInfoContainer.css';

type TProps = {
    title: 'Баланс' | 'Расходы'
    totalValue: string
    dataBase?: Array<any>
}

export const TransactionInfoContainer:React.FC<TProps> = React.memo((props) => {
    return <div className="transaction-info-container">
        <div className="transaction-info-header">
            <span className="transaction-info-title">{props.title}</span>
            <span className="transaction-info-total-value">{props.totalValue} ₽</span>
        </div>
        {
            props.title === "Баланс" ?
            <BalanceLineChart />
            : <TransactionBarChart />
        }
    </div>
})