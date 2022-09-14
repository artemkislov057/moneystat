import React from "react";
import { ExpensesCategoryValue } from "../../constants/expensesCategoryValue";
import { IncomeCategoryValue } from "../../constants/incomeCategoryValue";
import { ExpensesCategoryType, IncomeCategoryType, TransactionType } from "../../types/types";
import './transactionListItem.css';

type TProps = {
    type: ExpensesCategoryType | IncomeCategoryType
    price: string
    typePrice: TransactionType
    date?: string
    onClickDelete?: () => void
}

export const TransactionListItem:React.FC<TProps> = React.memo((props) => {
    return <div className="category-list-item">
        <div className="category-list-item-name-container">
            <span className={`category-list-item-name-icon ${props.type}`}></span>
            <div className="category-list-item-name-title-container">
                <span className="category-list-item-name-title">
                    {
                        ExpensesCategoryValue[props.type as ExpensesCategoryType ]
                        ? ExpensesCategoryValue[props.type as ExpensesCategoryType]
                        : IncomeCategoryValue[props.type as IncomeCategoryType]
                    }
                </span>
                {props.date &&
                    <span className="category-list-item-name-date">{props.date}</span>
                }
            </div>
        </div>
        <div className="category-list-item-price">
            <span className="category-list-item-price-value">
                {
                    props.typePrice === 'expenses' 
                    ? <>-</>
                    : <>+</>
                }
                {props.price} ₽
            </span>
            {props.onClickDelete &&
                <button className="category-list-item-price-delete-button" onClick={() => props.onClickDelete()}></button>
            }
        </div>
    </div>
})