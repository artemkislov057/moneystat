import { Chart, ChartData } from "chart.js";
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto'

export const DoughnutChart:React.FC = () => {
    const data: ChartData<'doughnut'> = {
        labels: [1,2,3,4,5,6,7,8],
        datasets: [
            {
                data: [1,2,3,4,5,6,7,8],
                backgroundColor: [
                    '#FBF248',
                    '#B1B2B5',
                    '#44B3FB',
                    '#01D9A0',
                    '#9B3DFD',
                    '#4851FB',
                    '#FB4B81',
                    '#FF8B4F'
                ]
            }
        ],
    }

    return <div 
        className="expenses-doughnut-diagram" 
        // style={{width: 250, height: 250}}
    >
        <Doughnut 
            data={
                data
            }
            options={                
                {
                    cutout: '75%',
                    plugins: {
                        legend: {
                            display: false
                        }
                    }                    
                }
            }
            plugins={[
                {
                    id: '1',
                    beforeDraw: function(chart, ) {
                        var width = chart.width,
                            height = chart.height,
                            ctx = chart.ctx;
                            ctx.restore();
                            var fontSize = (height / 160).toFixed(2);
                            ctx.font = fontSize + "em sans-serif";
                            ctx.textBaseline = "top";
                            let sum = 0;
                            for(let i = 0; i < chart.data.datasets[0].data.length; i++) {
                                console.log(chart.data.datasets[0].data[i])
                                if(!chart.legend.legendItems[i].hidden) {
                                    sum += chart.data.datasets[0].data[i] as number;
                                }
                            }
                            var text = sum.toString() + ' ₽',
                            textX = Math.round((width - ctx.measureText(text).width) / 2),
                            textY = height / 2 - 15;
                            ctx.fillText(text, textX, textY);
                            ctx.save();
                    },
                },
                ]
            }
        />
    </div>
}