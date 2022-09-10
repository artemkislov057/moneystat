import { Chart, ChartData } from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import 'chart.js/auto'


export const TestDiagram:React.FC = () => {
    const [num, setNum] = useState<number>(3);
    const data: ChartData<'line'> = {
        labels: [1,2,3,4,5,6],
        datasets: [
            {
                data: [num,2,3,4,5,6],
                
                fill: {
                    target: 'origin',
                    above:'rgb(255, 0, 0)',
                    below:'rgb(0, 0, 255)'
                },
                
               
            }
        ],
    }

    return <div 
        className="test-diagram" 
        style={{width: '1000px'}}
    >
        <Line 
            data={
                data
            }
            options={                
                {
                }
            }
            
            
        />
    </div>
}