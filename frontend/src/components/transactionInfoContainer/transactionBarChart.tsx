import { ChartData } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { TransactionType } from "../../types/types";

type TProps = {
    type: TransactionType
}

export const TransactionBarChart:React.FC<TProps> = (props) => {
    const data: ChartData<'bar'> = {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        datasets: [
            {                
                data: props.type === 'expenses' 
                    ?[4000,7000,8000,9000,5000,6005,2,3,3434,1,2,45,45,4,4,5656,3, 150000]
                    :[4000,45,45,4545,4111,56356,34353, 150000,7000,8000,9000,5000,6005,2,3,3434,1,2,],
                backgroundColor: props.type === 'expenses' ? '#4851FB' : '#01D9A0'
            }
        ],
    }

    return <div 
        style={{width: '100%', height: '100%'}}
    >
        <Bar 
            data={
                data
            }
            options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },                        
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                borderDash: [2,5]
                            }
                        }
                    }
                }
            }
        />
    </div>
}