import React, { useState, useEffect } from "react";
import api from "../api/data";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "../api/data";
import "./css/Data.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

function Data() {
  const rowStyle = {
    backgroundColor: "#c0c0c0",
  };
  const altRowStyle = {
    backgroundColor: "#ffffff",
  };

  const [formList, setFormList] = useState([]);
  // const [formData, setFormData] = useState("")

  //Retrieve data
  const retrieveData = async () => {
    const response = await api.get("/data");
    console.log(response);
    return response.data;
  };

  useEffect(() => {
    const getAllData = async () => {
      const allData = await retrieveData();
      console.log(allData);
      if (allData) setFormList(allData);
    };

    getAllData();

    //setCounter(counter+1);
    console.log(formList);
  }, []);

  // Delete Data
  const deleteData = async (id) => {
    await api.delete(`/data/${id}`);
    const newData = formList.filter((data) => {
      return data.id !== id;
    });
    setFormList(newData);
  };

  return (
    <div className="mx-5">    
      <h1 class="center">List of Data</h1>
      <Link to="/add">
        <button  className="btn btn-success">Add Data</button>
      </Link>
      <table class="table nth-child">
        <thead>
          <tr>
            <th scope="col">Sr No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Choice</th>
            <th scope="col">Tech</th>
            <th scope="col">Gender</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        {formList.map((entry, index) => {
          console.log(entry);
          {
            /* updateCounter(); */
          }
          return (
            <tbody>
              <tr style={index % 2 === 0 ? rowStyle : altRowStyle}>
                <td>{index + 1}</td>
                <td>{entry.inputText}</td>
                <td>{entry.inputEmail}</td>
                <td>{entry.inputSelect}</td>
                {/* <td>{entry.inputCheckbox}</td> */}
                {entry.inputCheckbox.length > 0 && (
                  <td>
                    {entry.inputCheckbox.map((item) => {
                      return <span>{item + " "} </span>;
                    })}
                  </td>
                )}

                <td>{entry.inputRadio}</td>
                <td>
                  <Link to={`/update/${entry.id}`} state={entry}>
                    <button class="btn btn-outline-dark">Update</button>
                  </Link>
                </td>
                <td>                  
                  <button
                    class="btn btn-danger "
                    onClick={() => deleteData(entry.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default Data;
