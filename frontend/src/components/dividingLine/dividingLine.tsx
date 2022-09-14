import React from "react";
import './dividingLine.css';

type TProps = {
    color: 'gray' | 'lightGray'
}

export const DividingLine:React.FC<TProps> = React.memo((props) => {
    return <div className={`dividing-line ${props.color}`}></div>
})