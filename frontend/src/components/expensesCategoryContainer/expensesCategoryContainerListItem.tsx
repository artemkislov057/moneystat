import React from "react";
import { ExpensesCategoryValue } from "../../constants/expensesCategoryValue";
import { ExpensesCategoryType } from "../../types/types";

type TProps = {
    type: ExpensesCategoryType
    price: string
}

export const CategoryListItem:React.FC<TProps> = React.memo((props) => {
    return <div className="category-list-item">
        <div className="category-list-item-name-container">
            <span className={`category-list-item-name-icon ${props.type}`}></span>
            <span className="category-list-item-name-title">{ExpensesCategoryValue[props.type]}</span>
        </div>
        <div className="category-list-item-price">
            <span className="category-list-item-price-value">-{props.price} ₽</span>
        </div>
    </div>
})