import './App.css';
import Header from "./components/Header"
import AddBudget from "./components/AddBudget/AddBudget"
import AddExpenses from './components/AddExpenses/AddExpenses';

import Expenses from './components/Expenses/Expenses';



function App() {

  let task = [
    {
      "id": 1,
      "text": "Hotel",
      "price": "$5"
    },
    {
      "id": 2,
      "text": "Car Rental",
      "price": "$5"

    },
    {
      "id": 3,
      "text": "Food",
      "price": "$5"

    }
  ]

  // When someone adds a new expense to the database
  const addExpense = async (expense) => {
    console.log(expense)
    const res = await fetch("/expense", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(expense),
    })
  }

  return (
    <div>
      <Header title={"Pocket Wise"} userName={"Elvin"} budget={"5000"}/>

      <div className="flex">
      <AddBudget />
      <AddExpenses onAdd={addExpense}/>
      </div>

      <div className='expenseDiv'>
        <h1>Expense List</h1>
        <Expenses tasks={task}/>
      </div>


    </div>
  );
}

export default App;