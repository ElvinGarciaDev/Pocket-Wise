import Expense from "./Expense";

const Expenses = ({tasks}) => {
  return (
    <>
      {tasks.map((task) => (
        <Expense task={task}
        key={task._id}
        /> // We're passing an object to the Task component
      ))}
    </>
  );
};

export default Expenses;
