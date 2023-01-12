// import './App.css';
import Header from "./components/Header"
import AddBudget from "./components/AddBudget"

function App() {
  return (
    <div>
      <Header title={"Pocket Wise"} userName={"Elvin"} budget={"5000"}/>
      <AddBudget />
    </div>
  );
}

export default App;
