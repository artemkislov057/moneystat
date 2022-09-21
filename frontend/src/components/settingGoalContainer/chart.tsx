import { Chart, ChartData } from "chart.js";
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto'
import { GoalColorsType } from "../../types/types";
import { GoalColorsValue } from "../../constants/goalColorsValue";

type TProps = {
    goalColor: GoalColorsType
    totalSum: string
    currentSum: string
}

export const DoughnutChart:React.FC<TProps> = (props) => {
    const data: ChartData<'doughnut'> = {
        labels: [1,2],
        datasets: [
            {
                data: [(+props.currentSum / +props.totalSum) * 100, 100 - (+props.currentSum / +props.totalSum) * 100],
                backgroundColor: [
                    GoalColorsValue[props.goalColor],
                    '#D9D9D9'
                ],
                borderWidth: 0
            }
        ],
    }

    return <div 
        className="info-goal-doughnut-diagram" 
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
                            var fontSize = (height / 200).toFixed(2);
                            ctx.font = fontSize + "em sans-serif";
                            ctx.textBaseline = "top";
                            let percent = (+props.currentSum / +props.totalSum) * 100;
                            var text = percent.toFixed(1) + '%',
                            textX = Math.round((width - ctx.measureText(text).width) / 2),
                            textY = height / 2 - 15;
                            ctx.fillText(text, textX, textY);
                            let sumInfo = `${props.currentSum}₽ / ${props.totalSum}₽`
                            ctx.fillText(sumInfo, textX, textY + 30);
                            ctx.save();
                    },
                },
                ]
            }
        />
    </div>
}