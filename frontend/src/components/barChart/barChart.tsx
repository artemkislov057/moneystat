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
        data: [10,15,11,100,123,1,1,1,2,3,48,4,5,6,5,6],
        backgroundColor: '#01D9A0',
        barPercentage: .35,
        borderRadius: 100,
      },
      {
        label: 'Расходы',
        data: [20,5,100,123,1,1,1,2,3,48,4,5,6,5,6],
        backgroundColor: '#4851FB',
        barPercentage: .35,
        borderRadius: 100
      },
    ],
  };

export const BarChart:React.FC<TProps> = React.memo((props) => {
    return <div className="bar-chart-container">
        <div className="bar-chart-chart">
            <div className="bar-chart-chart-help">
            <Bar 
                options={{
                    plugins: {
                        legend: {
                            display: false,
                            position: 'top' as const,
                        },        
                    },
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 12
                                }
                            }
                        },
                        y: {
                            grid: {
                                borderDash: [2,5]
                            },
                            ticks: {
                                font: {
                                    size: 14
                                }
                            }
                        }
                    },
                    
                }}            
                style={{
                    // background: '#FFFFFF',
                    // padding: '0 30px 10px 20px',
                    // height: '180px',
                    // boxSizing: 'border-box'
                }}
                data={data}
            />
            </div>
        </div>
    </div>
})