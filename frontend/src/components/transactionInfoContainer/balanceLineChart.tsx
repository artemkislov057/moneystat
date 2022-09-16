import { ChartData } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

type TProps = {
    
}

export const BalanceLineChart:React.FC<TProps> = (props) => {
    const data: ChartData<'line'> = {
        labels: [1,2,3,4,5,6],
        datasets: [
            {
                data: [4000,7000,8000,9000,5000,6005],
                
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
        className="test-diagram" 
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
                        }
                    }
                }
            }
        />
    </div>
}