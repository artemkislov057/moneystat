import React, { useContext, useState } from "react";
import { MenuItem } from "./menuItem";
import './leftMenu.css';
import { SectionType } from "../../types/types";
import { WindowSizeContext } from "../../context/windowSizeContext";
import { CSSTransition } from 'react-transition-group';
import { Fade } from "@mui/material";

type TProps = {
    onClickSummary: () => void
    onClickTransactions: () => void
    onClickGoals: () => void
    activeButton: SectionType
}

export const LeftMenu:React.FC<TProps> = (props) => {
    const isSmallWindowWidth: boolean = useContext(WindowSizeContext).windowWidth < 1280;
    const [isOpenWithSmallWindow, setIsOpenWithSmallWindow] = useState<boolean>(false);

    function openMenu() {
        setIsOpenWithSmallWindow(true);
    }

    function closeMenu() {
        setIsOpenWithSmallWindow(false);
    }

    return <>
        <div className={`left-menu-container-shadow-help ${ isOpenWithSmallWindow ? 'show-small' : '' }`}></div>
        <div className={`left-menu-container-background-gray ${ isOpenWithSmallWindow ? 'show-small' : '' }`} onClick={closeMenu}></div>
        <div className={`left-menu-container ${ isSmallWindowWidth ? 'hidden' : ''} ${ isOpenWithSmallWindow ? 'show-small' : '' }`}>
            {
                isSmallWindowWidth && !isOpenWithSmallWindow
                ? <div className="left-menu-burger-button-container">
                    <button className="left-menu-burger-button" onClick={() => openMenu()} ></button>
                </div>
                : <span className="left-menu-title">moneystat</span>
            }
            <div className="left-menu-category">
                <MenuItem 
                    isActive={props.activeButton === 'summary'}
                    type={'summary'}
                    onClick={() => {props.onClickSummary(); closeMenu()}}
                />
                <MenuItem 
                    isActive={props.activeButton === 'transactions'}
                    type={'transactions'}
                    onClick={() => {props.onClickTransactions(); closeMenu()}}
                />
                <MenuItem 
                    isActive={props.activeButton === 'goals'}
                    type={'goals'}
                    onClick={() => {props.onClickGoals(); closeMenu()}}
                />
                <MenuItem 
                    isActive={false}
                    type={'exit'}
                    onClick={() => console.log('exit')}
                />
            </div>
        </div>
        
    </>
}