import React from "react";
import { DividingLine } from "../dividingLine/dividingLine";
import { SummaryExpensesHeader } from "../summaryExpensesHeader/summaryExpensesHeader";
import './expensesCategoryContainer.css';
import { CategoryListItem } from "./expensesCategoryContainerListItem";

export const ExpensesCategoryContainer:React.FC = () => {
    return <div className="expenses-category-container">
        <SummaryExpensesHeader 
            title="Категории"
        />
        <div className="expenses-category-container-list">
            <CategoryListItem 
                type="auto"
                price="1523"
            />
            <DividingLine />
            <CategoryListItem 
                type="food"
                price="1523"
            />
            <DividingLine />
            <CategoryListItem 
                type="connections"
                price="1523"
            />
            <DividingLine />
            <CategoryListItem 
                type="health"
                price="1523"
            />
            <DividingLine />
            <CategoryListItem 
                type="transport"
                price="1523"
            />
            <DividingLine />
            <CategoryListItem 
                type="entertainment"
                price="1523"
            />
            <DividingLine />
            
        </div>
    </div>
}