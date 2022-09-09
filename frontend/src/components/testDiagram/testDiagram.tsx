import { Chart, ChartData } from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto'
import { wait } from "@testing-library/user-event/dist/utils";


export const TestDiagram:React.FC = () => {
    const [num, setNum] = useState<number>(3);
    const data: ChartData<'doughnut'> = {
        labels: [1,2,3,4,5,6],
        datasets: [
            {
                data: [num,2,3,4,5,6],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ]
            }
        ],
    }

    return <div className="test-diagram" style={{width: 400}}>
        <button onClick={() => setNum(num + 1)}>{num}</button>
        <Doughnut 
            data={
                data
            }
            options={                
                {
                    cutout: '85%',
                    
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
                            var text = sum.toString(),
                            textX = Math.round((width - ctx.measureText(text).width) / 2),
                            textY = height / 2;
                            ctx.fillText(text, textX, textY);
                            ctx.save();
                    },
                },
                ]
            }
        />
    </div>
}