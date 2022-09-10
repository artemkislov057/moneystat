import React from "react";
import './infoSummaryContainer.css';

type TProps = {
    type: 'button expenses' | 'button income' | 'info'
    title: string
    value: string
}

export const InfoSummaryContainer:React.FC<TProps> = React.memo((props) => {
    return <div className={`info-summary-container ${props.type}`}>
        {
            props.type !== 'info' &&
            <span className={`info-summary-container-icon ${props.type}`}></span>
        }
        <div className={`info-summary-container-data ${props.type}`}>
            <span className="info-summary-container-data-title">{props.title}</span>
            <span className="info-summary-container-data-value">{props.value}</span>
        </div>
    </div>
})