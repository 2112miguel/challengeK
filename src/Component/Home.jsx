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
        <section>
          <h2>Tipos de campos que se permiten</h2>
        </section>
        <section className="inputsStyle ">
          <label>Name</label>
          <input type="text" name="name" value="" />
        </section>
        <section className="inputsStyle ">
          <label>Select</label>
          <select name="" id=""></select>
        </section>
        <section className="inputsStyle">
          <label>radio</label>
          <input type="radio" />
        </section>
      </div>
      <div>
        <h2>Campos que se pueden agregar y eliminar</h2>
        {inputs.map((inputElement, index) => (
          <div className="card " key={index}>
            <div>
              {inputElement.type === "select" ? (
                <div>
                  <select name="" id="">
                    <option value="">{inputElement.label}</option>
                  </select>
                </div>
              ) : inputElement.type === "text" ? (
                <div>
                  <input type="text" name="name" value={inputElement.label} />
                </div>
              ) : (
                <div>
                  <input type="radio" />
                  <label>{inputElement.label} </label>
                </div>
              )}
            </div>

            <div>
              <button type="button" onClick={() => removeFormFields(index)}>
                Remove
              </button>
            </div>
            <div className="button-section">
              <button type="button" onClick={() => addFormFields(inputElement)}>
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};
