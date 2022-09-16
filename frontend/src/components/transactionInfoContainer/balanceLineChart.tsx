import { ChartData } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

type TProps = {
    
}

export const BalanceLineChart:React.FC<TProps> = (props) => {
    const data: ChartData<'line'> = {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        datasets: [
            {
                data: [4000,7000,8000,9000,5000,6005,2345,2314,2333,3545,232,3,5444,633,1221,6,687,],
                
                fill: {
                    target: 'origin',
                    above:'rgb(139, 184, 240)',
                    below:'rgb(139, 184, 240)'
                },
                tension: .4,
                borderColor: '#4851FB'
                
               
            }
        ],
    }

    return <div 
        style={{width: '100%', height: '100%'}}
    >
        <Line 
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