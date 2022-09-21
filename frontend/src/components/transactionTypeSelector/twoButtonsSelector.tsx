import React from "react";
import { TransactionType } from "../../types/types";
import { TransactionTypeSelectorButton } from "./twoButtonsSelectorButton";
import './twoButtonsSelector.css';

type TProps = {
    activeButton: 'left' | 'right'
    onClick: (value: string) => void
    titleLeft: string
    titleRight: string
    valueLeft: string
    valueRight: string
}

export const TwoButtonsSelector:React.FC<TProps> = (props) => {
    return <div className="transaction-type-selector">
        <TransactionTypeSelectorButton 
            isActive={props.activeButton === 'left'}
            title={props.titleLeft}
            onClick={() => props.onClick(props.valueLeft)}
        />
        <div className="transaction-type-selector-dividing-line"></div>
        <TransactionTypeSelectorButton 
            isActive={props.activeButton === 'right'}
            title={props.titleRight}
            onClick={() => props.onClick(props.valueRight)}
        />
    </div>
}