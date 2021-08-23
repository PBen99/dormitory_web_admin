import React, { useState } from "react";
import InBudget from "./InBudget";
import OutBudget from "./OutBudget";

export default function Budget() {
  const [option, setOption] = useState("income");

  function handleChangeOption(event) {
    const value = event.target.value;
    setOption(value);
  }

  return (
    <div>
      <div className="col col-5 pd-16">
        <div className="col col-half">
          <label className="mr-8" htmlFor="income">
            Thu
          </label>
          <input
            type="radio"
            id="income"
            name="selection"
            value="income"
            onChange={(event) => handleChangeOption(event)}
            checked={option === "income"}
          />
        </div>
        <div className="col col-half">
          <label className="mr-8" htmlFor="outcome">
            Chi
          </label>
          <input
            type="radio"
            id="outcome"
            name="selection"
            value="outcome"
            onChange={(event) => handleChangeOption(event)}
            checked={option === "outcome"}
          />
        </div>
      </div>
      <div className="col col-full pd-16">
        {option === "income" ? <InBudget /> : <OutBudget />}
      </div>
    </div>
  );
}
