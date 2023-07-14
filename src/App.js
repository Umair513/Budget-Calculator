import logo from './logo.svg';
import './App.css';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { v4 as uuid } from "uuid";
import { useState } from 'react';


const initialExpenses = [
  {
    id: uuid(),
    charge: "rent",
    amount: 1600
  },
  {
    id: uuid(),
    charge: "car payment",
    amount: 400
  },
  {
    id: uuid(),
    charge: "credit card bill",
    amount: 1200
  },
]


function App() {

  const [expenses, setExpenses] = useState(initialExpenses)

  return (
    <>
      <Alert></Alert>
      <h1>Budget Calculator</h1>
      <main className='App'>
        <ExpenseForm></ExpenseForm>
        <ExpenseList expenses = {expenses}></ExpenseList>
      </main>
      <h1>
        Total Spending: <span className='total'>
          $ {expenses.reduce((acc, curr) => {
            return (acc += curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
