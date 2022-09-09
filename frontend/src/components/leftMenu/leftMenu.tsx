import React from "react";
import './leftMenu.css';
import { MenuItem } from "./menuItem";

type TProps = {
    onClickSummary: () => void
    onClickTransactions: () => void
    onClickGoals: () => void
    activeButton: 'summary' | 'transactions' | 'goals'
}

export const LeftMenu:React.FC<TProps> = (props) => {
    return <div className="left-menu-container">
        <span className="left-menu-title">moneystat</span>
        <div className="left-menu-category">
            <MenuItem 
                isActive={props.activeButton === 'summary'}
                type={'summary'}
                onClick={props.onClickSummary}
            />
            <MenuItem 
                isActive={props.activeButton === 'transactions'}
                type={'transactions'}
                onClick={props.onClickTransactions}
            />
            <MenuItem 
                isActive={props.activeButton === 'goals'}
                type={'goals'}
                onClick={props.onClickGoals}
            />
        </div>
    </div>
}