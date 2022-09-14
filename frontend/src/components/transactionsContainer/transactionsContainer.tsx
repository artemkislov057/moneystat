import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { expensesCategory } from "../../constants/expensesCategory";
import { incomeCategory } from "../../constants/incomeCategoryes";
import { ExpensesCategoryType, IncomeCategoryType, TransactionType } from "../../types/types";
import { DividingLine } from "../dividingLine/dividingLine";
import { MoneyInput } from "../moneyInput/moneyInput";
import { TransactionCategorySelectItem } from "../transactionCategorySelectItem/transactionCategorySelectItem";
import { TransactionTypeSelector } from "../transactionTypeSelector/transactionTypeSelector";
import './transactionsContainer.css';

const categoryItems = {
    income: incomeCategory,
    expenses: expensesCategory
}

export const TransactionsContainer:React.FC = (props) => {
    const [activeTransactionGroup, setActiveTransactionGroup] = useState<TransactionType>('income');

    function onClickTransactionGroupSelect(value: TransactionType) {
        setActiveTransactionGroup(value);
    }

    return <div className='transactions-container'>
        <TransactionTypeSelector
            activeGroup={activeTransactionGroup}
            onClick={(e) => onClickTransactionGroupSelect(e)}
        />
        <div>Март</div>
        <div className="transactions-container-filter-inputs-container">
            <div className="transactions-container-filter-inputs">
                <div className="transactions-container-filter-inputs-row">
                    <MoneyInput
                        label="Мин.сумма"
                    />
                    <MoneyInput
                        label="Макс.сумма"
                    />
                </div>
                <div className="transactions-container-filter-inputs-row">
                    <FormControl sx={{width: '45%'}}>
                        <InputLabel id="category-select">Категория</InputLabel>
                        <Select
                            id="category"
                            labelId="category-select"
                            label='Категория'
                            
                            // onChange={(e) => formik.setFieldValue('category', e.target.value)}
                            // value={formik.values.category}
                            value={''}
                        >                                    
                            {categoryItems[activeTransactionGroup].map((data) => {
                                return <MenuItem value={data} key={data}>
                                    <TransactionCategorySelectItem 
                                        type={data as ExpensesCategoryType | IncomeCategoryType}
                                    />
                                </MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <DividingLine color="lightGray" />
        </div>
    </div>
}