import React, { useState } from "react";
import Input from "./components/Input";
function Form() {
  const [formData, setFormData] = useState({
    inputText: "",
    inputEmail: "",
    inputPassword: "",
    inputCheckbox: false,
    inputRadio: "",
    inputSelect: "",
    inputTextArea: "",
  });

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
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Text Input:
        <Input
          type="text"
          name="inputText"
          value={formData.inputText}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email Input:
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
        Checkbox Input:
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
          onChange= {
            handleChange
          }
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
  );
}

export default Form;
