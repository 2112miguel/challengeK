import React, { useState } from "react";
import "./Home.scss";
import field from "./Data/Fields.json";

export const Home = () => {
  const [inputs, setinputs] = useState(field.fields);

  let addFormFields = (element) => {
    setinputs([...inputs, element]);
  };

  let removeFormFields = (i) => {
    let newinputs = [...inputs];
    newinputs.splice(i, 1);
    setinputs(newinputs);
  };

  return (
    <form className="flex-row">
      <div className="flex-col">
        <section className="inputsStyle">
          <label>Name</label>
          <input type="text" name="name" value="" />
        </section>
        <section className="inputsStyle">
          <label>Select</label>
          <select name="" id=""></select>
        </section>
        <section className="inputsStyle">
          <label>radio</label>
          <input type="radio" />
        </section>
      </div>
      <div>
        {inputs.map((element, index) => (
          <div className="card " key={index}>
            <div>
              {element.type === "select" ? (
                <div>
                  <select name="" id="">
                    <option value="">{element.label}</option>
                  </select>
                </div>
              ) : element.type === "text" ? (
                <div>
                  <input type="text" name="name" value={element.label} />
                </div>
              ) : (
                <div>
                  <input type="radio" />
                  <label>{element.label} </label>
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                className="button remove"
                onClick={() => removeFormFields(index)}
              >
                Remove
              </button>
            </div>
            <div className="button-section">
              <button
                className="button add"
                type="button"
                onClick={() => addFormFields(element)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};
