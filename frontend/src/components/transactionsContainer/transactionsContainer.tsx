import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { expensesCategory } from "../../constants/expensesCategory";
import { incomeCategory } from "../../constants/incomeCategoryes";
import { ExpensesCategoryType, IncomeCategoryType, TransactionType } from "../../types/types";
import { DividingLine } from "../dividingLine/dividingLine";
import { MoneyInput } from "../moneyInput/moneyInput";
import { TransactionCategorySelectItem } from "../transactionCategorySelectItem/transactionCategorySelectItem";
import { TransactionListItem } from "../transactionListItem/transactionListItem";
import { TransactionTypeSelector } from "../transactionTypeSelector/transactionTypeSelector";
import './transactionsContainer.css';

const categoryItems = {
    income: incomeCategory,
    expenses: expensesCategory
}

type TransactionItemType = {
    type: ExpensesCategoryType | IncomeCategoryType
    price: string
    date: string
}

const transactions: {income: Array<TransactionItemType>, expenses: Array<TransactionItemType>} = {
    income: [
        {
            type: "salary",
            price: '12323',
            date: '14.09.2022'
        },
        {
            type: "salary",
            price: '222',
            date: '14.09.2022'
        },
        {
            type: "investments",
            price: '220',
            date: '14.09.2022'
        }        
    ],
    expenses: [
        {
            type: "house",
            price: '54',
            date: '10.08.2022'
        },
        {
            type: "entertainment",
            price: '310',
            date: '10.08.2022'
        },
        {
            type: "transport",
            price: '32',
            date: '10.08.2022'
        },
        {
            type: "house",
            price: '54',
            date: '10.08.2022'
        },
        {
            type: "entertainment",
            price: '310',
            date: '10.08.2022'
        },
        {
            type: "transport",
            price: '32',
            date: '10.08.2022'
        },
        {
            type: "house",
            price: '54',
            date: '10.08.2022'
        },
        {
            type: "entertainment",
            price: '310',
            date: '10.08.2022'
        },
        {
            type: "transport",
            price: '32',
            date: '10.08.2022'
        },
    ]
}

export const TransactionsContainer:React.FC = (props) => {
    const [activeTransactionGroup, setActiveTransactionGroup] = useState<TransactionType>('income');

    function onClickTransactionGroupSelect(value: TransactionType) {
        setActiveTransactionGroup(value);
    }

    return <div className='transactions-container'>
        <div className="transactions-container-header">
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
        <div className="transactions-container-transaction-list">
            {transactions[activeTransactionGroup].map((item) => {
                return <div className="transactions-container-transaction-list-item">
                    <TransactionListItem 
                        price={item.price}
                        type={item.type}
                        typePrice={activeTransactionGroup}
                        date={item.date}
                        onClickDelete={() => {}}
                    />
                    <DividingLine color="lightGray" />
                </div>
            })}
        </div>
    </div>
}