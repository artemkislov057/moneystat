import { BarElement, CategoryScale, Chart, ChartData, Legend, LinearScale, Title, Tooltip } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import './barChart.css';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

type TProps = {

}

const options = {
    
    
};

const data: ChartData<'bar'> = {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    datasets: [
      {
        label: 'Доходы',
        data: [10,15],
        backgroundColor: '#01D9A0',
        barPercentage: .25        
      },
      {
        label: 'Расходы',
        data: [20,5],
        backgroundColor: '#4851FB',
        barPercentage: .25
      },
    ],
  };

export const BarChart:React.FC<TProps> = React.memo((props) => {
    return <div className="bar-chart-container">
        <Bar 
            options={{
                plugins: {
                    legend: {
                        position: 'top' as const,
                    },        
                },
                maintainAspectRatio: false,
                scales: {
                    screenX: {
                        display: false
                    }
                }
            }}
            style={{
                background: '#FFFFFF',
                padding: '0 30px 10px 20px',
                height: '180px !important',
                boxSizing: 'border-box'
            }}
            data={data}
        />
    </div>
})