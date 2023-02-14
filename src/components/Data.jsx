import React, { useState, useEffect } from "react";
import api from "../api/data";
import "bootstrap/dist/css/bootstrap.min.css";
let counter = 1;
function Data() {
  const [formList, setFormList] = useState([]);

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
    console.log(formList);
  }, []);

  return  (
      <div>
      <h1>List of Data</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Choice</th>
            <th scope="col">Tech</th>
          </tr>
        </thead>
      </table>

      {formList.map((entry) =>  {
        console.log(entry)
        return  (
          <table class="table table-striped">
            <tbody>
              <tr>
             
                <th scope="row">{counter++}</th>
                <td>{entry.inputText}</td>
                <td>{entry.inputEmail}</td>
                <td>{entry.inputSelect}</td>
                {/* <td>{entry.inputCheckbox}</td> */}
                {entry.inputCheckbox.length>0 && <td>{entry.inputCheckbox.map(item => {
                 return <span>{item+" "} </span>
                })}</td>}
              </tr>
            </tbody>
          </table>
        ) ;
      })}
    </div>
  ) ;
}

export default Data;
