import { Button, Fade, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import React from "react";
import { goalColors } from "../../constants/goalColors";
import { MoneyInput } from "../moneyInput/moneyInput";
import { SelectColorItem } from "./selectColorItem";
import { TitleGoalContainer } from "./titleGoalContainer";

type TProps = {
    type: 'create' | 'edit'
    data?: any //
}

const titleTypeValues = {
    title: {
        create: 'Новая цель',
        edit: 'Моя цель'
    },
    finishButton: {
        create: 'Создать',
        edit: 'Сохранить'
    }
}


export const CreateGoalContainer:React.FC<TProps> = (props) => {
    const formik = useFormik({
        initialValues: {
            title: '', 
            date: '',
            totalSum: '', 
            currentSum: '',
            caption: '',
            goalColor: ''
        },
        onSubmit: (e) => console.log(e)
    })

    return <div className="create-goal-container">
        <TitleGoalContainer value={titleTypeValues.title[props.type]} />
        <form className="create-goal-container-form" id="create-goal-container-form" onSubmit={formik.handleSubmit}>
            <TextField                                
                id="title"
                label={'Название цели'}
                fullWidth
                required
                type={'text'}
                onChange={formik.handleChange}
                value={formik.values.title}                
            />
            <DesktopDatePicker                
                label="Желаемая Дата"
                inputFormat="DD/MM/YYYY"
                value={formik.values.date}
                onChange={(e) => formik.setFieldValue('date', e)}
                renderInput={(params) => {
                    return <TextField 
                        {...params}                        
                    />
                }}
            />
            <MoneyInput
                label="Целевая сумма"
                onChange={(e) => formik.setFieldValue('totalSum', e)}
                value={formik.values.totalSum}
                id={'totalSum'}
                required
            />
            <MoneyInput
                label="Уже накоплено"
                onChange={(e) => formik.setFieldValue('currentSum', e)}
                value={formik.values.currentSum}
                id={'currentSum'}
                required
            />
            <TextField
                id="caption"
                label={'Описание цели'}
                fullWidth
                required
                type={'text'}
                onChange={formik.handleChange}
                value={formik.values.caption}                
            />
            <FormControl sx={{width: 200}}>
                <InputLabel id="color-select">Цвет цели</InputLabel>
                <Select
                    id="goalColor"
                    labelId="color-select"
                    label='Цвет цели'
                    
                    onChange={(e) => formik.setFieldValue('goalColor', e.target.value)}
                    value={formik.values.goalColor}
                >                                    
                    {goalColors.map((data) => {
                        return <MenuItem value={data} key={data}>
                            <SelectColorItem color={data} />
                        </MenuItem>
                    })}
                </Select>
            </FormControl>
        </form>
        <div className="create-goal-container-buttons">
            <Button
                variant="contained"
                // color="warning"
                size="large"
                fullWidth
                sx={{height: 50, ":hover": {backgroundColor: '#f5f7fbc9'}, backgroundColor:"#F5F7FB", color: '#4851FB'}}
            >
                Отменить
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                type="submit"
                form='create-goal-container-form'
            >
                {titleTypeValues.finishButton[props.type]}
            </Button>
        </div>
    </div>
}