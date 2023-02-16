import React, { useEffect, useState, useNavigate } from "react";
import Input from "./Input";
import api from "../api/data";
import { v1 as uuid } from "uuid";
import "./css/FormInput.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
  

const FormInput = () => {

  const [formData, setFormData] = useState({
    inputText: "",
    inputEmail: "",
    inputPassword: "",
    inputCheckbox: [],
    inputRadio: "",
    inputSelect: "Cricket",
    inputTextArea: "",
  });

  const addData = async () => {
    console.log(formData);
    const request = {
      id: uuid(),
      ...formData,
    };
    const response = await api.post("/data", request);
    console.log(response);
    // setFormData(response.data);
    setFormData({
      inputText: "",
      inputEmail: "",
      inputPassword: "",
      inputCheckbox: [],
      inputRadio: "",
      inputSelect: "",
      inputTextArea: "",
    });
  };
  const inputCheckboxList = [
    "react","nodejs","java"
  ]


  const handleCheckboxChange = (event) => {
    const checkboxName = event.target.name;
    const checkboxValue = event.target.checked;

    const updatedinputCheckbox = formData.inputCheckbox.slice(); // make a copy of the interests array
    console.log(updatedinputCheckbox)
    if (checkboxValue) {
      updatedinputCheckbox.push(checkboxName);
    console.log(updatedinputCheckbox)

    } else {
      const index = updatedinputCheckbox.indexOf(checkboxName);
      updatedinputCheckbox.splice(index, 1);
    console.log(updatedinputCheckbox)

    }

    setFormData({ ...formData, inputCheckbox: updatedinputCheckbox });
  }


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

  };

  function handleInput(e) {
    if (
      formData.inputText === "" ||
      formData.inputEmail === "" ||
      formData.inputTextArea === "" ||
      formData.inputSelect === "" || formData.inputRadio === ""
    ) {
      alert("Please complete the form");
      e.preventDefault();
    }

    if (formData.inputCheckbox.length === 0) {
      alert("Select tech");
      e.preventDefault();
    }

    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInput();
    addData();

    console.log(formData);
  };
  return (
    <div class="justify-content-center text-center">
      <form class="container" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Form Page</h1>
        <div className="container col">
          <div className="row">
            <div class="mb-3 col-6">
              <label for="exampleFormControlInput1" class="form-label">
                Name
              </label>
              <input
                name="inputText"
                onChange={handleChange}
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                value={formData.inputText}
              />
            </div>
            <div class="mb-3 col-6">
              <label for="exampleFormControlInput1" class="form-label">
                Email address
              </label>
              <input
                name="inputEmail"
                onChange={handleChange}
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                value={formData.inputEmail}
              />
            </div>
          </div>
          <div className="row">
            <div class="mb-3 col-6">
              <label for="exampleFormControlInput1" class="form-label">
                Password
              </label>
              <input
                onChange={handleChange}
                name="inputPassword"
                type="password"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter your password"
                value={formData.inputPassword}
              />
            </div>
          </div>

          <div className="form-check form-check-inline">
            Your preferred teck Stack:
          </div>

          {inputCheckboxList.map((data)=>{
            return  <div class="form-check form-check-inline">
            <Input
              id="check2"
              class="form-check-input"
              type="checkbox"
              name={data}
              checked={formData.inputCheckbox.includes(data)}
              onChange={handleCheckboxChange}
              value={data}
            />
            <label class="form-check-label" for="inlineCheckbox1">
              {data}
            </label>
          </div>
          })}

          {/* <div className="form-check form-check-inline">
            <Input
              class="form-check-input"
              id="check1"
              type="checkbox"
              name="react"
              checked={isChecked}
              onChange={handleChange}
              value="react"
            />
            <label class="form-check-label" for="inlineCheckbox1">
              React
            </label>
          </div>

          <div className="form-check form-check-inline">
            <Input
              class="form-check-input"
              type="checkbox"
              name="nodejs"
              checked={isChecked}
              onChange={handleChange}
              value="nodejs"
            />
            <label class="form-check-label" for="inlineCheckbox1">
              Node
            </label>
          </div>

          <div class="form-check form-check-inline">
            <Input
              id="check2"
              class="form-check-input"
              type="checkbox"
              name="java"
              checked={isChecked}
              onChange={handleChange}
              value="java"
            />
            <label class="form-check-label" for="inlineCheckbox1">
              Java
            </label>
          </div> */}
          <br /> <br/>
          <div className="form-check form-check-inline">
            Gender:
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inputRadio"
              value="Male"
              checked={formData.inputRadio === "Male"}
              onChange={handleChange}
            />
            <label class="form-check-label" for="inlineRadio1">
              Male
            </label>
          </div>

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
                  name="inputRadio"
                  value="Female"
                  checked={formData.inputRadio === "Female"}
                  onChange={handleChange}
            />
            <label class="form-check-label" for="inlineRadio1">
              Female
            </label>
          </div>

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
                  name="inputRadio"
                  value="Other"
                  checked={formData.inputRadio === "Other"}
                  onChange={handleChange}
            />
            <label class="form-check-label" for="inlineRadio1">
              Others
            </label>
          </div>

          <br/><br/>

          <div class="dropdown col-6">Hobbies</div>
          <select
            class="form-select"
            name="inputSelect"
            style={{ display: "block" }}
            aria-label="Default select example"
            onChange={handleChange}
          >
            <option name="inputSelect" value="Cricket" selected>
              Cricket
            </option>
            <option name="inputSelect" value="Music">
              Music
            </option>
            <option name="inputSelect" value="Gaming">
              Gaming
            </option>
          </select>
          <br />
          <label>
            <textarea
              rows="3"
              cols="50"
              placeholder="Add a comment"
              name="inputTextArea"
              value={formData.inputTextArea}
              onChange={handleChange}
            />
          </label>
          <br />
          <button className="btn btn-primary mx-5 col-4" type="submit">
            Submit
          </button>
        </div>
      </form>
      <br></br>
      <Link to="/">
    
        <button  className="btn btn-secondary mx-5 col-6" >Show Data</button>
      </Link>
    </div>
  );
};

export default FormInput;
