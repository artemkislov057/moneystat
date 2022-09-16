import React from "react";
import { DividingLine } from "../dividingLine/dividingLine";
import { SummaryExpensesHeader } from "../summaryExpensesHeader/summaryExpensesHeader";
import { TransactionListItem } from "../transactionListItem/transactionListItem";
import './expensesCategoryContainer.css';

export const ExpensesCategoryContainer:React.FC = () => {
    return <div className="expenses-category-container">
        <div className="expenses-category-header-container">
            <SummaryExpensesHeader 
                title="Категории"
            />
        </div>        
        <div className="expenses-category-container-list-container">
            <div className="expenses-category-container-list">
                <TransactionListItem 
                    type="auto"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine color="gray"/>
                <TransactionListItem 
                    type="food"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine color="gray"/>
                <TransactionListItem 
                    type="connections"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine color="gray"/>
                <TransactionListItem 
                    type="health"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine color="gray"/>
                <TransactionListItem 
                    type="transport"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine color="gray"/>
                <TransactionListItem 
                    type="entertainment"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine color="gray"/>
                <TransactionListItem 
                    type="house"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine color="gray"/>
            </div>
        </div>
    </div>
}