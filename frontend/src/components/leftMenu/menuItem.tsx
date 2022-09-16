import React from "react";
import { SectionType } from "../../types/types";

type TProps = {
    isActive: boolean
    type: SectionType
    onClick: () => void
}

const nameButtons = {
    summary: 'Сводка',
    transactions: 'Транзакции',
    goals: 'Цели',
    exit: 'Выход'
}

export const MenuItem:React.FC<TProps> = (props) => {
    return <div 
        className={`menu-item-container ${props.isActive ? 'active': ''} ${props.type}`}
        onClick={() => props.onClick()}
    >
        <span className={`menu-item-icon ${props.type} ${props.isActive ? 'active': ''}`}></span>
        <span className="menu-item-name">{nameButtons[props.type]}</span>
    </div>
}