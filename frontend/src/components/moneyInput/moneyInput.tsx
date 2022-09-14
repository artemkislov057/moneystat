import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import './moneyInput.css';

type TProps = {
    label: string
}

export const MoneyInput:React.FC<TProps> = (props) => {
    return <TextField
        label={props.label}
        type={'number'}
        fullWidth
        InputProps={{
            startAdornment: <InputAdornment position="start">₽</InputAdornment>
        }}
    />
}