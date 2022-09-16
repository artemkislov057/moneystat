import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
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
    const [currentCategoryFilter, setCurrentCategoryFilter] = useState<ExpensesCategoryType | IncomeCategoryType | ''>('');
    const [minCostValueFilter, setMinCostValueFilter] = useState<number>(null);
    const [maxCostValueFilter, setMaxCostValueFilter] = useState<number>(null);


    function onClickTransactionGroupSelect(value: TransactionType) {
        setActiveTransactionGroup(value);
        setCurrentCategoryFilter('');
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
                            value={minCostValueFilter}
                            onChange={(e) => setMinCostValueFilter(e)}
                        />
                        <MoneyInput
                            label="Макс.сумма"
                            value={maxCostValueFilter}
                            onChange={(e) => setMaxCostValueFilter(e)}
                        />
                    </div>
                    <div className="transactions-container-filter-inputs-row">
                        <FormControl sx={{width: '45%'}}>
                            <InputLabel id="category-select">Категория</InputLabel>
                            <Select
                                id="category"
                                labelId="category-select"
                                label='Категория'
                                
                                onChange={(e) => setCurrentCategoryFilter(e.target.value as ExpensesCategoryType | IncomeCategoryType)}
                                value={currentCategoryFilter}
                            >
                                <MenuItem value=''>
                                    Все категории
                                </MenuItem>
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
            {transactions[activeTransactionGroup].map((item, i) => {
                if(currentCategoryFilter !== item.type && currentCategoryFilter !== '') {
                    return null;
                }
                if(minCostValueFilter && +item.price < minCostValueFilter) {
                    return null;
                }
                if(maxCostValueFilter && +item.price > maxCostValueFilter) {
                    return null;
                }
                
                return <div className="transactions-container-transaction-list-item" key={item.date+item.price+ ' ' +i}>
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