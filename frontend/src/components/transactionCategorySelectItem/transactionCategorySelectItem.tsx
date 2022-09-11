import React, { useEffect } from "react";
import { ExpensesCategoryValue } from "../../constants/expensesCategoryValue";
import { IncomeCategoryValue } from "../../constants/incomeCategoryValue";
import { ExpensesCategoryType, IncomeCategoryType } from "../../types/types";
import './transactionCategorySelectItem.css';

type TProps = {
    type: ExpensesCategoryType | IncomeCategoryType
}

export const TransactionCategorySelectItem:React.FC<TProps> = React.memo((props) => {
    useEffect(() => {
        
    }, [])

    return <div className="transaction-category-select-container">
        <span className={`transaction-category-select-icon ${props.type}`}></span>
        <div className="transaction-category-select-title-container">
            <span className='transaction-category-select-title'>
                {
                    ExpensesCategoryValue[props.type as ExpensesCategoryType ]
                    ? ExpensesCategoryValue[props.type as ExpensesCategoryType]
                    : IncomeCategoryValue[props.type as IncomeCategoryType]                    
                }
            </span>
        </div>
    </div>
})