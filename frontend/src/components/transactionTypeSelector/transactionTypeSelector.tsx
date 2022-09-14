import React from "react";
import { TransactionType } from "../../types/types";
import './transactionTypeSelector.css';
import { TransactionTypeSelectorButton } from "./transactionTypeSelectorButton";

type TProps = {
    activeGroup: TransactionType
    onClick: (value: TransactionType) => void
}

export const TransactionTypeSelector:React.FC<TProps> = (props) => {
    return <div className="transaction-type-selector">
        <TransactionTypeSelectorButton 
            isActive={props.activeGroup === 'income'}
            title={'Доходы'}
            onClick={() => props.onClick("income")}
        />
        <div className="transaction-type-selector-dividing-line"></div>
        <TransactionTypeSelectorButton 
            isActive={props.activeGroup === 'expenses'}
            title={'Расходы'}
            onClick={() => props.onClick("expenses")}
        />
    </div>
}