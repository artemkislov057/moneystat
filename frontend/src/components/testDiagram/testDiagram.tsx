import { Chart, ChartData } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto'


export const TestDiagram:React.FC = () => {
    const data: ChartData<'doughnut'> = {
        labels: [1,2,3,4],
        datasets: [
            {
                data: [1,2,3,4,5,6],
            }
        ]
    }
    return <div className="test-diagram">
        <Doughnut 
            data={
                data
            }
        />
    </div>
}