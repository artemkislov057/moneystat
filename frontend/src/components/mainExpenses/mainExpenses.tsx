import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { expensesCategory } from "../../constants/expensesCategory";
import { ExpensesCategoryType } from "../../types/types";
import { SummaryExpensesHeader } from "../summaryExpensesHeader/summaryExpensesHeader";
import { TransactionCategorySelectItem } from "../transactionCategorySelectItem/transactionCategorySelectItem";
import { DoughnutChart } from "./doughnutChart";
import './mainExpenses.css';

type TProps = {

}

export const MainExpenses:React.FC<TProps> = (props) => {
    return <div className="main-expenses-container">
        <SummaryExpensesHeader 
            title="Основные расходы"
        />
        <div className="main-expenses-show-container">
            <span>Показать за Март</span>
            <FormControl fullWidth>
                {/* <InputLabel id="expenses-category-for-half">Категория</InputLabel> */}
                <Select
                    labelId="expenses-category-for-half"
                    label='Категория'
                    fullWidth
                    variant="standard"
                    size="small"
                >
                    {expensesCategory.map((data) => {
                        return <MenuItem value={data} key={data}>
                            <TransactionCategorySelectItem 
                                type={data as ExpensesCategoryType}
                            />
                        </MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
        <div className="main-expenses-chart">
            <DoughnutChart />
        </div>
    </div>
}