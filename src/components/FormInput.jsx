import React, { useEffect, useState, useNavigate } from "react";
import Input from "./Input";
import api from "../api/data";
import { v1 as uuid } from "uuid";
import "./css/FormInput.css";
import img from  "./css/img_avatar.png"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

const FormInput = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [validationError, setValidationError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [base64Image, setBase64Image] = useState('');


  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({
    inputText: "",
    inputEmail: "",
    inputPassword: "",
    inputCheckbox: [],
    inputRadio: "",
    inputSelect: "Cricket",
    inputTextArea: "",
  });


  function handleImageUpload(event) {
    const file = event.target.files[0];
    console.log(file)
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = async() => {
        setImageFile(file);
        const base64Image = reader.result.split(",")[1];
        setValidationError('');
        console.log(base64Image)
        console.log(reader.result.split(",")[1])
        // Convert image URL to base64 and post to fake API
        const request = {
         
          base64Image:base64Image
          
        };

        const response =  await api.post("/imageURL",request)
        const imageResponse = await api.get("/imageURL");
        setImageUrl(imageResponse.data.base64Image);

      };
    } else {
      setValidationError('Please select a JPEG or PNG image file.');
    }
  }
  
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };


  
  const addData = async () => {
    console.log(formData);

    formData.inputEmail = formData.inputEmail.toLowerCase();
    const request = {
      id: uuid(),
      ...formData,
    };
    const response = await api.post("/data", request);
    console.log(response.data);

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
  const inputCheckboxList = ["react", "nodejs", "java"];

  const handleCheckboxChange = (event) => {
    const checkboxName = event.target.name;
    const checkboxValue = event.target.checked;

    const updatedinputCheckbox = formData.inputCheckbox.slice(); // make a copy of the interests array
    console.log(updatedinputCheckbox);
    if (checkboxValue) {
      updatedinputCheckbox.push(checkboxName);
      console.log(updatedinputCheckbox);
    } else {
      const index = updatedinputCheckbox.indexOf(checkboxName);
      updatedinputCheckbox.splice(index, 1);
      console.log(updatedinputCheckbox);
    }

    setFormData({ ...formData, inputCheckbox: updatedinputCheckbox });
  };

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
      formData.inputSelect === "" ||
      formData.inputRadio === ""
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
      <input type="file" className="form-control"  onChange={handleImageUpload}/>

        <h1 style={{ textAlign: "center" }}>Form Page</h1>
        <span>  
        {validationError && <p>{validationError}</p>}
       {/* {imageUrl && <img className="avatar"  alt="Uploaded Image" />} */}
       { <img src={`data:image/png;base64,${imageUrl}`} className="avatar" alt="Uploaded Image" />}
        </span>
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
                type={passwordType}
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter your password"
                value={formData.inputPassword}
              />
              <label>Show Password</label>
              <span> </span>
              <input type="checkbox" onClick={togglePassword}></input>
              <i class="bi bi-eye-slash" id="togglePassword"></i>
            </div>
          </div>
          <div className="form-check form-check-inline">
            Your preferred teck Stack:
          </div>
          {inputCheckboxList.map((data) => {
            return (
              <div class="form-check form-check-inline">
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
            );
          })}
          
          <br /> <br />
          <div className="form-check form-check-inline">Gender:</div>
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
          <br />
          <br />
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
      <Link to="/">
        <button className="btn btn-secondary col-3 btn-circle ">Show Data</button>
      </Link>
      <br></br>
    </div>
  );
};

export default FormInput;
