import "./Expense.css";

const Expense = ({ task, onDelete }) => {
  return (
    <div className="singleExpense">
      <ul>
        <li className="nav-item">
          <h3>{task.title}</h3>
        </li>
        <li className="nav-item price">
          <span>${task.price}</span>
        </li>
        <li className="nav-item">
          <i className="bi bi-trash3-fill" onClick={() => onDelete(task._id)}></i>
        </li>
      </ul>
    </div>
  );
};

export default Expense;
