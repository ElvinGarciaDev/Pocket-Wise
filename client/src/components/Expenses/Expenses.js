import Expense from "./Expense";

const Expenses = ({tasks, onDelete}) => {
  return (
    <>
      {tasks.map((task) => (
        <Expense task={task}
        key={task._id}
        onDelete={onDelete}
        /> // We're passing an object to the Task component
      ))}
    </>
  );
};

export default Expenses;
