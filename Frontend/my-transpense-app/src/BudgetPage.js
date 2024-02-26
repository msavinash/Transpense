import React, {useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BudgetProgressBar from './Component/BudgetProgressBar';
import { Doughnut, Line } from 'react-chartjs-2';
import { TextField, Button } from '@mui/material';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import faker from 'faker';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);


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

const getRandomColor = (index) => {
    const colors = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)',
    ];
  
    return colors[index % colors.length];
  };


const line_labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
];

export const line_data = {
  line_labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: line_labels.map(() =>
        faker.datatype.number({ min: -1000, max: 1000 })
      ),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: line_labels.map(() =>
        faker.datatype.number({ min: -1000, max: 1000 })
      ),
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

const data = {
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

// Sample transactions data
const transactions = [
  {
    id: 1,
    date: '2023-01-01',
    description: 'Grocery shopping',
    amount: 100,
    status: 'Completed',
    category: 'Groceries',
  },
  {
    id: 2,
    date: '2023-01-03',
    description: 'Electricity bill',
    amount: 75,
    status: 'Completed',
    category: 'Utilities',
  },
  {
    id: 3,
    date: '2023-01-04',
    description: 'Monthly rent',
    amount: 500,
    status: 'Completed',
    category: 'Rent',
  },
  // Add more transactions as needed
];

const BudgetPage = () => {

  const [budgetTotal, setBudgetTotal] = useState(300);
  const [budgetRows, setBudgetRows] = useState([
    { id: 1, itemName: 'Item 1', itemAmount: 100 },
    { id: 2, itemName: 'Item 2', itemAmount: 200 },
    // Add more initial rows as needed
  ]);

// Function to get labels and data for Doughnut chart from budgetRows
const getDoughnutData = () => {
    const labels = budgetRows.map((row) => row.itemName);
    const data = budgetRows.map((row) => row.itemAmount);

    return {
      labels,
      datasets: [
        {
          data,
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
  };

  const [chartData, setChartData] = useState(getDoughnutData());


  const handleAddRow = () => {
    const newRow = { id: budgetRows.length + 1, itemName: '', itemAmount: 0 };
    setBudgetRows([...budgetRows, newRow]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = budgetRows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setBudgetRows(updatedRows);
  };

  const updateChartData = () => {
    const newChartData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    };

    let remainingBudget = budgetTotal;

    budgetRows.forEach((row, index) => {
      newChartData.labels.push(row.itemName);
      newChartData.datasets[0].data.push(row.itemAmount);
      newChartData.datasets[0].backgroundColor.push(getRandomColor(index));
      newChartData.datasets[0].borderColor.push('rgba(255, 255, 255, 1)');

      remainingBudget -= row.itemAmount;
    });

    // Add 'Unused Budget' entry if there's remaining budget
    if (remainingBudget > 0) {
      newChartData.labels.push('Unused Budget');
      newChartData.datasets[0].data.push(remainingBudget);
      newChartData.datasets[0].backgroundColor.push(
        getRandomColor(budgetRows.length)
      );
      newChartData.datasets[0].borderColor.push('rgba(255, 255, 255, 1)');
    }

    setChartData(newChartData);
  };

  

  return (
    <div>
      <div>
        <div className='total-budget'>
          <p>Total Budget: $1000</p>
        </div>
      </div>
      <div>
        <BudgetProgressBar spent={700} available={300} />
      </div>
      <div className='visualizations'></div>
      <div className='data-accordions'>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            Budget Allocation
          </AccordionSummary>
          <AccordionDetails>
            <div className='budget-donut'>
              {/* <Doughnut data={donut_data} /> */}
              <Doughnut data={getDoughnutData()} />
            </div>

            <div className='budget-table'>
            <TextField
              label='Total Budget'
              type='number'
              value={budgetTotal}
              onChange={(e) => setBudgetTotal(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell align='right'>Item Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {budgetRows.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <TextField
                          value={row.itemName}
                          onChange={(e) => handleInputChange(row.id, 'itemName', e.target.value)}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <TextField
                          type='number'
                          value={row.itemAmount}
                          onChange={(e) => handleInputChange(row.id, 'itemAmount', e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant='outlined' onClick={handleAddRow}>
              Add Row
            </Button>
          </div>

          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2-content'
            id='panel2-header'
          >
            Transactions
          </AccordionSummary>
          <AccordionDetails>
            <div className='transactions-line'>
              <Line options={line_options} data={line_data} />
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='transaction table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount ($)</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.status}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default BudgetPage;
