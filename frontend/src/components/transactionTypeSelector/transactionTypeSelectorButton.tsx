import { Button } from "@mui/material";
import React from "react";

type TProps = {
    isActive: boolean
    title: string
    onClick: () => void
}

export const TransactionTypeSelectorButton:React.FC<TProps> = (props) => {
    return <Button
        variant="text"
        sx={{color: props.isActive ? '#4851FB' : 'black', fontWeight: 600}}
        size="large"
        onClick={props.onClick}
    >{props.title}</Button>
}