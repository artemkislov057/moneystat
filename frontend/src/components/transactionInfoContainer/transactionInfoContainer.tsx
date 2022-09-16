import React from "react";
import { TransactionType } from "../../types/types";
import { BalanceLineChart } from "./balanceLineChart";
import { TransactionBarChart } from "./transactionBarChart";
import './transactionInfoContainer.css';

type TProps = {
    type: TransactionType | 'balance'
    totalValue: string
    dataBase?: Array<any>
}

const typeValue = {
    income: 'Доходы',
    expenses: 'Расходы',
    balance: 'Баланс'
}

export const TransactionInfoContainer:React.FC<TProps> = React.memo((props) => {
    return <div className="transaction-info-container">
        <div className="transaction-info-header">
            <span className="transaction-info-title">{typeValue[props.type]}</span>
            <span className="transaction-info-total-value">{props.totalValue} ₽</span>
        </div>
        {
            props.type === "balance" ?
            <BalanceLineChart />
            : <TransactionBarChart 
                type={props.type}
            />
        }
    </div>
})