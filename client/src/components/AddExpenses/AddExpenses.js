import { useState } from "react";
import Button from "../Button";

const AddExpenses = ({onAdd}) => {
  // State for title product
  const [title, setTitle] = useState("");

  // Update the title product
  function handleTitleChange(e) {
    // set the state with what ever is on the input
    setTitle(e.target.value);
  }

  // State for item price
  const [price, setPrice] = useState("");

  // Update the price input
  function handlePriceChange(e) {
    // set the state with what ever is on the input
    setPrice(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault()

    onAdd({title, price})
  }

  return (
    <div className="continer pt-5 flex">
      <form action="" onSubmit={onSubmit}>
        <div className="card" style={{ width: "25rem", height: "100%" }}>
          <div className="card-body">
            <h5 className="card-title">Expense</h5>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Item bought"
              value={title}
              onChange={handleTitleChange}
            />

            <input
              type="number"
              className="form-control mt-3"
              placeholder="Enter Item Price"
              value={price}
              onChange={handlePriceChange}
            />
            <Button
              btnType={"submit"}
              text={"Submit expense"}
              color={"btn btn-primary mt-2"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddExpenses;
