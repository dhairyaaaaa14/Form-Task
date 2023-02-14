import React, { useEffect, useState, useNavigate } from "react";
import Input from "./Input";
import api from "../api/data";
import { v1 as uuid } from "uuid";
import { BrowserRouter as Router, Routes, 
  Route, Redirect, Link,} from "react-router-dom";
import ShowButton from "./ShowButton";

const FormInput = () => {
    const [formData, setFormData] = useState({
        inputText: "",
        inputEmail: "",
        inputPassword: "",
        inputCheckbox: false,
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
        console.log(e.target.value);
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: type === "checkbox" ? checked : value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(formData);
        addData();
      };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <Input
            type="text"
            name="inputText"
            value={formData.inputText}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email
          <Input
            type="email"
            name="inputEmail"
            value={formData.inputEmail}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password Input:
          <Input
            type="password"
            name="inputPassword"
            value={formData.inputPassword}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Checkbox:
          <Input
            type="checkbox"
            name="inputCheckbox"
            checked={formData.inputCheckbox}
            onChange={handleChange}
          />
        </label>
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
            value={formData.inputSelect}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </label>
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
        <button type="submit">Submit</button>
      </form>
      <Link to="/   ">Show Data</Link>
     
    </div>
  );
};

export default FormInput;
