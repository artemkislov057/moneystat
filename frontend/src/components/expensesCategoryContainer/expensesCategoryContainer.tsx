import React from "react";
import { DividingLine } from "../dividingLine/dividingLine";
import { CategoryListItem } from "../expensesCategoryListItem/expensesCategoryListItem";
import { SummaryExpensesHeader } from "../summaryExpensesHeader/summaryExpensesHeader";
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
                <CategoryListItem 
                    type="auto"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine />
                <CategoryListItem 
                    type="food"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine />
                <CategoryListItem 
                    type="connections"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine />
                <CategoryListItem 
                    type="health"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine />
                <CategoryListItem 
                    type="transport"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine />
                <CategoryListItem 
                    type="entertainment"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine />
                <CategoryListItem 
                    type="house"
                    price="1523"
                    typePrice="expenses"
                />
                <DividingLine />
            </div>
        </div>
    </div>
}