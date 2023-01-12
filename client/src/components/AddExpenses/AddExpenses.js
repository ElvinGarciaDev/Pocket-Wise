import { useState } from "react";
import Button from "../Button";

const AddExpenses = ({}) => {
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
    setTitle(e.target.value);
  }

  return (
    <div className="continer pt-5 flex">
      <form action="">
        <div className="card" style={{ width: "25rem", height: "100%" }}>
          <div className="card-body">
            <h5 class="card-title">Expense</h5>

            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Item bought"
              value={title}
              onChange={handleTitleChange}
            />

            <input
              type="number"
              className="form-control mt-3"
              id="exampleFormControlInput2"
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
