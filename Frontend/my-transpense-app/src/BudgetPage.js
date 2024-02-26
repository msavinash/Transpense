import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Doughnut, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, } from 'chart.js';
import faker from 'faker';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,);

    export const line_options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      
      const line_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
      export const line_data = {
        line_labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: line_labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: line_labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

const donut_data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  

const BudgetPage = () => {
  return (
    <div>
        <div>
          <div className="total-budget" ><p>Total Budget: $1000 ç
            lol you suck</p></div>
        </div>
        <div className='visualizations'>
            
        </div>
        <div className='data-accordions'>

        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            >
            Budget Allocation
            </AccordionSummary>
            <AccordionDetails>
                <div className='budget-donut'>
                    <Doughnut data={donut_data} />
                </div>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            >
            Transactions
            </AccordionSummary>
            <AccordionDetails>
                <div className='transactions-line'>
                    <Line options={line_options} data={line_data} />
                </div>
            </AccordionDetails>
        </Accordion>
        </div>
    </div>
  );
};

export default BudgetPage;