import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import './moneyInput.css';

type TProps = {
    label: string
    value: number | string
    onChange: (e: number | string) => void
    id?: string
    required?: boolean
}

export const MoneyInput:React.FC<TProps> = (props) => {
    return <TextField
        label={props.label}
        type={'number'}
        fullWidth
        InputProps={{
            startAdornment: <InputAdornment position="start">₽</InputAdornment>
        }}
        value={props.value || ''}
        onChange={e => props.onChange(e.target.value)}
        id={props?.id}
        required={props?.required}
    />
}