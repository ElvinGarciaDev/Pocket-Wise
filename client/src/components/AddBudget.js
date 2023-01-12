import { useState } from "react";
import Button from "./Button" 

const AddBudget = ({}) => {
  // set the state of the input we need. By default the state should be empty
  const [text, setText] = useState("");

  return (
    <div className="continer">
      <form action="">
        <div className="card" style={{width: "25rem", margin: "2px auto"}}>
          <div className="card-body">
          <h5 class="card-title">Budget</h5>

          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Budget"
          />
            <Button text={"Update Budget"} color={"btn btn-primary mt-2"}/>
            
          </div>
        </div>

        {/* <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Budget"
            style={{
              width: "500px",
              margin: "2px auto",
              borderRadius: "5px",
              fontSize: "20px",
            }}
          />
        </div> */}
      </form>
    </div>
  );
};

export default AddBudget;
