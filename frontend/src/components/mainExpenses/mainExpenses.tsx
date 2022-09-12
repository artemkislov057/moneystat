import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { expensesCategory } from "../../constants/expensesCategory";
import { ExpensesCategoryType } from "../../types/types";
import { SummaryExpensesHeader } from "../summaryExpensesHeader/summaryExpensesHeader";
import { TransactionCategorySelectItem } from "../transactionCategorySelectItem/transactionCategorySelectItem";
import { DoughnutChart } from "./doughnutChart";
import './mainExpenses.css';

type TProps = {

}

export const MainExpenses:React.FC<TProps> = (props) => {
    const [categories, setCategories] = useState<Array<string>>(['']);

    function update(e: SelectChangeEvent<string[]>) {
        let value = e.target.value;
        setCategories(
            typeof value === 'string' ? value.split(',') : value,
          );
    }

    return <div className="main-expenses-container">
        <SummaryExpensesHeader 
            title="Основные расходы"
        />
        <div className="main-expenses-show-container">
            <span>Показать за Март</span>
            <FormControl variant="standard" fullWidth sx={{maxWidth: 300}}>
                {/* <InputLabel id="expenses-category-for-half">Категория</InputLabel> */}
                <Select
                    labelId="expenses-category-for-half"
                    label='Категория'
                    multiple
                    value={categories}
                    onChange={e => update(e)}
                    // size={'small'}
                >
                    <MenuItem value={''}>
                        Все категории
                    </MenuItem>
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