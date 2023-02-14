import React, { useEffect, useState, useNavigate } from "react";
import Input from "./Input";
import api from "../api/data";
import { v1 as uuid } from "uuid";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import ShowButton from "./ShowButton";






const FormInput = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [checkedName, setCheckedName] = useState("");
    const[hobby,setHobby] = useState("Cricket");

  const [formData, setFormData] = useState({
    inputText: "",
    inputEmail: "",
    inputPassword: "",
    inputCheckbox: [],
    inputRadio: "",
    inputSelect: "",
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
    setFormData(response.data);
  };

  const handleChange = (e) => {
   
    const { name, value, type, checked } = e.target;
    setIsChecked(e.target.checked);
   
    if (type==="checkbox" && e.target.checked) {
      setCheckedName(e.target.name);
      setFormData({
        ...formData,
        inputCheckbox:[...formData.inputCheckbox,e.target.name], 
      })
      console.log(e.target.name);
    } else {
        setCheckedName("");
    }

     if(type === "select-one")setHobby(value);

    
    // console.log(value);
    // console.log(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(value);
  };

  function handleInput(e) {
    if (
      formData.inputText === "" ||
      formData.inputEmail === "" ||
      formData.inputTextArea === "" ||
      formData.inputSelect === ""
    ) {
      alert("Please complete the form");
      e.preventDefault();
    }

    if( formData.inputCheckbox.length===0 ){
        alert("Select tech")
        e.preventDefault();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInput();
    addData();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Form Page</h1>
        <div className="container">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Name</label>
            <input onChange={handleChange} type="text" class="form-control" id="exampleFormControlInput1" placeholder="" />
        </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input onChange={handleChange} type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
          <br />
          <label>
            Password
            <Input
              type="password"
              name="inputPassword"
              value={formData.inputPassword}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>Your preferred teck Stack</label>
          <br></br>

          <div className="checkBoxDiv">
            <label>React</label>
            <Input 
              type="checkbox"
              name="react"
            checked={isChecked}
              onChange={handleChange}
              value="react"
            />

            <label>
              NodeJS
              <Input
                type="checkbox"
                name="nodejs"
                checked={isChecked}
                onChange={handleChange}
                value="nodejs"
              />
            </label>

            <label>
            Java
              <Input
                type="checkbox"
                name="java"
                checked={isChecked}
                onChange={handleChange}
                value="java"
              />
            </label>
          </div>

          <br />
          <label>
            Radio Input 1:
            <Input
              type="radio"
              name="inputRadio"
              value="option1"
              checked={formData.inputRadio === "option1"}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Radio Input 2:
            <Input
              type="radio"
              name="inputRadio"
              value="option2"
              checked={formData.inputRadio === "option2"}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Select Input:
            <select
              name="inputSelect"
              value="sd"
              onChange={handleChange}
            >
              <option value="-1">Select an option</option>
              <option value="cricket">Cricket</option>
              <option value="music">Music</option>
              <option value="gaming">Gaming</option>
            </select>

          </label>
        
          <select class="form-select" style={{display: "block"}} aria-label="Default select example" onChange={handleChange}>
            <option value="Cricket" selected>Cricket</option>
            <option value="Music">Music</option>
            <option value="Gaming">Gaming</option>
            </select>
          <br />
          <label>
            Textarea Input:
            <textarea
              name="inputTextArea"
              value={formData.inputTextArea}
              onChange={handleChange}
            />
          </label>
          <br />
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
      <Link to="/showData">Show Data</Link>
    </div>
  );
};

export default FormInput;
