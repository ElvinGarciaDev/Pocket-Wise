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

  return (
    <div>
      <Header title={"Pocket Wise"} userName={"Elvin"} budget={"5000"}/>

      <div className="flex">
      <AddBudget />
      <AddExpenses />
      </div>

      <div className='expenseDiv'>
        <Expenses tasks={task}/>
      </div>


    </div>
  );
}

export default App;
