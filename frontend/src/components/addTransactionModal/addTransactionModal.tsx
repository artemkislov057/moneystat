import { Box, Button, Fade, FormControl, InputAdornment, InputLabel, ListSubheader, MenuItem, Modal, Select, SxProps, TextField, Theme } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { expensesCategory } from "../../constants/expensesCategory";
import { incomeCategory } from "../../constants/incomeCategoryes";
import { ExpensesCategoryType, IncomeCategoryType } from "../../types/types";
import { TransactionCategorySelectItem } from "../transactionCategorySelectItem/transactionCategorySelectItem";
import './addTransactionModal.css';

type TProps = {
    type: 'income' | 'expenses'
    isOpen: boolean,
    closeModal: () => void
    // subCategory: any - get from db
}

const categoryItems = {
    income: incomeCategory,
    expenses: expensesCategory
}

const title = {
    income: 'Доходы',
    expenses: 'Расходы'
}

const style: SxProps<Theme> = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: 'none',
    border: "none",
    boxShadow: 24,
};

export const AddTransactionModal:React.FC<TProps> = (props) => {
    const formik = useFormik({
        initialValues: {
            sum: '', 
            category: '', 
            subCategory: '', 
            date: Date.now()
        },
        onSubmit: (e) => console.log(e)
    })

    useEffect(() => {
        for(let [key, value] of Object.entries(formik.values)) {
            //@ts-ignore
            formik.values[key] = formik.initialValues[key]
        }
    }, [props.isOpen])

    return <div className="add-transaction-modal-container">
        <Modal
            open={props.isOpen}            
            closeAfterTransition            
            onClose={() => props.closeModal()}
        >
        <Fade in={props.isOpen}>
            <Box sx={style}>
                <div className="add-transaction-modal-content-container">
                    <div className="add-transaction-modal-content-header">
                        <span className="add-transaction-modal-content-header-title">{title[props.type]}</span>
                        <button className="add-transaction-modal-content-header-close-button" onClick={() => props.closeModal()}></button>
                    </div>                    
                    <form className="add-transaction-modal-content-inputs" id="transaction-form" onSubmit={formik.handleSubmit}>
                            <TextField                                
                                id="sum"
                                label={'Введите сумму'}
                                fullWidth
                                required
                                type={'number'}
                                onChange={formik.handleChange}
                                value={formik.values.sum}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="category-select">Категория</InputLabel>
                                <Select
                                    id="category"
                                    labelId="category-select"
                                    label='Категория'
                                    fullWidth
                                    onChange={(e) => formik.setFieldValue('category', e.target.value)}
                                    value={formik.values.category}
                                >                                    
                                    {categoryItems[props.type].map((data) => {
                                        return <MenuItem value={data} key={data}>
                                            <TransactionCategorySelectItem 
                                                type={data as ExpensesCategoryType | IncomeCategoryType}
                                            />
                                        </MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="subcategory-select">Подкатегория</InputLabel>
                                <Select
                                    id='subCategory'
                                    labelId="subcategory-select"
                                    label='Подкатегория'
                                    fullWidth
                                    onChange={(e) => formik.setFieldValue('subCategory', e.target.value)}
                                    value={formik.values.subCategory}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <ListSubheader>
                                        <TransactionCategorySelectItem 
                                            type="food"
                                        />
                                    </ListSubheader>
                                    <MenuItem value={'products'}>Пельмени</MenuItem>
                                    <MenuItem value={'products'}>Макароны</MenuItem>
                                    <ListSubheader>
                                        <TransactionCategorySelectItem 
                                            type="clothes"
                                        />
                                    </ListSubheader>
                                    <MenuItem value={3}>Футболки</MenuItem>
                                    <MenuItem value={4}>Кросовки</MenuItem>
                                </Select>
                            </FormControl>
                            <DesktopDatePicker                                    
                                label="Дата"
                                inputFormat="DD/MM/YYYY"
                                value={formik.values.date}
                                onChange={(e) => formik.setFieldValue('date', e)}
                                renderInput={(params) => {
                                    return <TextField 
                                        {...params}                                        
                                    />
                                }}
                            />                            
                    </form>
                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        form='transaction-form'
                    >
                        Добавить
                    </Button>
                </div>
            </Box>
        </Fade>
        </Modal>
    </div>
}