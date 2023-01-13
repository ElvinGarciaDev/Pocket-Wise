import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header";
import AddBudget from "./components/AddBudget/AddBudget";
import AddExpenses from "./components/AddExpenses/AddExpenses";

import Expenses from "./components/Expenses/Expenses";

function App() {
  // Store the data that will be fetched from the backend. AT first it will be empty
  const [data, setData] = useState([]);

  // Store the budget the user saved to the database
  const [budget, setBudget] = useState()

  // Store the balance. AT the start set the balance to the total budget
  const [balance, setBalance] = useState()


  // Fetch all expenses
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api");
      const data = await res.json();

      // the data we are getting looks like this. it's a big array that has all ther data, expenes, budget and a callculation
      // Of all the expenses. We need to break up the array and store specific data at different state variables
      // [
      //   {
      //     _id: 63c0d1cb2f1721388f151770,
      //     title: 'car',
      //     price: 100,
      //     createdAt: 2023-01-13T03:36:43.770Z,
      //     __v: 0
      //   },
      //   {
      //     _id: 63c0d1db2f1721388f151772,
      //     title: 'hotel',
      //     price: 50,
      //     createdAt: 2023-01-13T03:36:59.797Z,
      //     __v: 0
      //   },
      //   { _id: 63c0c52d2c41d334914337e2, budget: 500, __v: 0 },
      //   { allExpenses: 150 }
      // ]
    
      // Should hold all the expenses
      // let expenses = data.pop() // Pop the last element which should hold the expenses added up

      // Create an array and add the poped element from above which should hold the expenses added up
      // let arrExpense = []
      // arrExpense.push(expenses)

      // pop the last element which should be the one that had the budget
      let budget = data.pop() // remove the budget element
      let arrBudget = []
      arrBudget.push(budget)
      // Use the setBudget method to add the budget number to the budget state. Ex: 500
      setBudget(arrBudget[0].budget)

      // Add the biggingn set the balance to the same as the budget
      setBalance(arrBudget[0].budget)

      // Now the only thing that should be in the data array are the item expenses
      setData(data);

    }
    fetchData();

  }, []);


  // When someone adds a new expense to the database
  const addExpense = async (expense) => {
    const res = await fetch("/expense", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    const newExpense = await res.json();
    // The new task that was added will be sent back.
    // We need to set the new task. So take the current tasks state and add the new element added (data)
    setData([...data, newExpense]);

    // Update the balance
    setBalance(Number(balance) - Number(newExpense.price))
  };

  // When somone deletes an expense
  const deleteExpense = async (id) => {

    // Use setData to update the state. use the filter method to filter out the expense that was clicked
    setData(data.filter((expense) => expense._id !== id));
    
    let findExpense = data.filter((expense) => expense._id == id)
    // Update the balance
    console.log("is this", findExpense)
    setBalance(Number(balance) + Number(findExpense[0].price))

    await fetch(`/expense/${id}`, {
      method: "DELETE",
    });


  };

    // Add budget
    const addBudget = async (expense) => {
      console.log(expense)
      const res = await fetch("/budget", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(expense),
      });
  
      const budget = await res.json();
      // The new task that was added will be sent back.
      // We need to set the new task. So take the current tasks state and add the new element added (data)
      setBudget([budget]);
    };

  return (
    <div>
      <Header title={"Pocket Wise"} userName={"Elvin"} budget={budget} />

      <div className="flex">
        
        {budget == undefined ? (<AddBudget onAdd={addBudget} innerText={"Enter budget"} />) : (<AddBudget innerText={"Update budget"}/>)}
        <AddExpenses onAdd={addExpense} />
      </div>

      <div>
      <ul>
        <li>Total Budget</li>
        <li>{budget}</li>
      </ul>

      <ul>
        <li>Balance</li>
        <li>{balance}</li>
      </ul>

      </div>

      <div className="expenseDiv">
        <h1>Expense List</h1>
        <Expenses tasks={data} onDelete={deleteExpense}/>
      </div>

    </div>

  );
}

export default App;
