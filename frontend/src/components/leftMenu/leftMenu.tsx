import React from "react";
import './leftMenu.css';
import { MenuItem } from "./menuItem";

export const LeftMenu:React.FC = () => {
    return <div className="left-menu-container">
        <span className="left-menu-title">moneystat</span>
        <div className="left-menu-category">
            <MenuItem 
                isActive={true}
                type={'summary'}
                onClick={() => {}}
            />
            <MenuItem 
                isActive={false}
                type={'transactions'}
                onClick={() => {}}
            />
            <MenuItem 
                isActive={false}
                type={'goals'}
                onClick={() => {}}
            />
        </div>
    </div>
}