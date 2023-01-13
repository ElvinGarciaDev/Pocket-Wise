import { useState } from "react";
import Button from "../Button";
import './AddBudget.css'


const AddBudget = ({}) => {
  // set the state of the input we need. By default the state should be empty
  const [text, setText] = useState("");

  // Update the input state
  function handleTextChange(event) {
    // set the state with what ever is on the input
    setText(event.target.value);
  }

  return (
    <div className="continer pt-5 flex" >
      <form action="">
        <div className="card" style={{ width: "25rem", height: "250px"}}>
          <div className="card-body">
            <h5 className="card-title">Budget</h5>

            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Budget"
              value={text}
              onChange={handleTextChange}
            />
            <Button btnType={"submit"} text={"Update Budget"} color={"btn btn-primary mt-2"} />
          </div>
        </div>

        
      </form>
    </div>
  );
};

export default AddBudget;
