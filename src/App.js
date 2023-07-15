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
  const [charge, setCharge] = useState("")
  const [amount, setAmount] = useState(0)

  const handleCharge = e => {
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    setAmount(e.target.value)
  }
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({show: false})
    }, 3000);
  }
  const [alert, setAlert] = useState({show: false})
  const handleSubmit = e => {
    e.preventDefault();
    console.log(charge, amount)
    if (charge != "" && amount > 0) {
      const singleExpense = {
        id: uuid(),
        charge,
        amount
      }
      setExpenses([...expenses, singleExpense])
      setCharge("")
      setAmount(0)
      handleAlert({type: "success", text:"item added"})
    }
    else {
      handleAlert({type:"danger", text: `charge can't be empty value and amount value has to be bigger than 0`})
    }
  }

  const clearItems = () => {
    setExpenses([])
    handleAlert({type:"danger", text: "All items deleted"})
  }
  const handleDelete = (id) => {
    let temExpenses = expenses.filter(item => item.id !== id)
    setExpenses(temExpenses)
    handleAlert({type:"danger", text:"item deleted"})
  }
  const handleEdit = (id) => {

  }
  return (
    <>
      {alert.show && <Alert type={alert.type} text = {alert.text}></Alert>}
      <Alert></Alert>
      <h1>Budget Calculator</h1>
      <main className='App'>
        <ExpenseForm charge={charge} amount={amount} handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit}></ExpenseForm>
        <ExpenseList expenses = {expenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems}></ExpenseList>
      </main>
      <h1>
        Total Spending: <span className='total'>
          $ {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
