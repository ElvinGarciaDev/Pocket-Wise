import './App.css';
import Header from "./components/Header"
import AddBudget from "./components/AddBudget/AddBudget"

function App() {
  return (
    <div>
      <Header title={"Pocket Wise"} userName={"Elvin"} budget={"5000"}/>

      <div className="flex">
      <AddBudget />
      <AddBudget />
      </div>


    </div>
  );
}

export default App;
