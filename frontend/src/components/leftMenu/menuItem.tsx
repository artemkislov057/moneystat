import React from "react";

type TProps = {
    isActive: boolean
    type: 'summary' | 'transactions' | 'goals'
    onClick: () => void
}

const nameButtons = {
    summary: 'Сводка',
    transactions: 'Транзакции',
    goals: 'Цели'
}

export const MenuItem:React.FC<TProps> = (props) => {
    return <div className={`menu-item-container ${props.isActive ? 'active': ''}`}>
        <span className={`menu-item-icon ${props.type} ${props.isActive ? 'active': ''}`}></span>
        <span className="menu-item-name">{nameButtons[props.type]}</span>
    </div>
}