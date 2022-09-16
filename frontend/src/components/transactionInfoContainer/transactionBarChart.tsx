import { ChartData } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

type TProps = {
    
}

export const TransactionBarChart:React.FC = (props) => {
    const data: ChartData<'bar'> = {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        datasets: [
            {                
                data: [4000,7000,8000,9000,5000,6005,2,3,3434,1,2,45,45,4,4,5656,3, 150000],
                backgroundColor: '#4851FB'
                
               
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