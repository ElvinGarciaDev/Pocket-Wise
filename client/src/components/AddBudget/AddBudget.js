import { useState } from "react";
import Button from "../Button";
import './AddBudget.css'


const AddBudget = ({innerText, onAdd}) => {
  // set the state of the input we need. By default the state should be empty
  const [text, setText] = useState("");

  // Update the input state
  function handleTextChange(event) {
    // set the state with what ever is on the input
    setText(event.target.value);
  }

  // Submitt the budget
  const onSubmit = (e) => {
    e.preventDefault()

    onAdd({text})

    // Empty the input field
    setText("")
  }

  return (
    <div className="continer pt-5 flex" >
      <form action="" onSubmit={onSubmit}>
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
            <Button btnType={"submit"} text={innerText} color={"btn btn-primary mt-2"} />
          </div>
        </div>

        
      </form>
    </div>
  );
};

export default AddBudget;
