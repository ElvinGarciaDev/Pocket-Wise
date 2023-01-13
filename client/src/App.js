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
  const [budget, setBudget] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api");
      const data = await res.json();
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
  };

  // When somone deletes an expense
  const deleteExpense = async (id) => {

    // Use setData to update the state. use the filter method to filter out the expense that was clicked
    setData(data.filter((expense) => expense._id !== id));

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
      <Header title={"Pocket Wise"} userName={"Elvin"} budget={"5000"} />

      <div className="flex">
        
        {budget.length == 0 ? (<AddBudget onAdd={addBudget} innerText={"Enter budget"} />) : (<AddBudget innerText={"Update budget"}/>)}
        <AddExpenses onAdd={addExpense} />
      </div>

      <div className="expenseDiv">
        <h1>Expense List</h1>
        <Expenses tasks={data} onDelete={deleteExpense}/>
      </div>
    </div>
  );
}

export default App;
