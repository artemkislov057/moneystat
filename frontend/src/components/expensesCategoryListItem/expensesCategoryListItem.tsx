import React from "react";
import { ExpensesCategoryValue } from "../../constants/expensesCategoryValue";
import { ExpensesCategoryType } from "../../types/types";
import './expensesCategoryListItem.css';

type TProps = {
    type: ExpensesCategoryType
    price: string
    typePrice: 'income' | 'expenses'
    date?: string
    onClickDelete?: () => void
}

export const CategoryListItem:React.FC<TProps> = React.memo((props) => {
    return <div className="category-list-item">
        <div className="category-list-item-name-container">
            <span className={`category-list-item-name-icon ${props.type}`}></span>
            <div className="category-list-item-name-title-container">
                <span className="category-list-item-name-title">{ExpensesCategoryValue[props.type]}</span>
                {props.date &&
                    <span className="category-list-item-name-date">{props.date}</span>
                }
            </div>
        </div>
        <div className="category-list-item-price">
            <span className="category-list-item-price-value">
                {props.typePrice === 'expenses' && <>-</>}
                {props.price} ₽
            </span>
            {props.onClickDelete &&
                <button className="category-list-item-price-delete-button" onClick={() => props.onClickDelete()}></button>
            }
        </div>
    </div>
})