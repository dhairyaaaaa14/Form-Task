import React, { useEffect, useState, useNavigate } from "react";
import Input from "./components/Input";
import api from "./api/data";
import { v1 as uuid } from "uuid";
import ShowButton from "./components/ShowButton";
//  import "../src/App.css"
import { BrowserRouter as Router, Routes, 
  Route, Redirect,} from "react-router-dom";

import Data from "./components/Data";
import FormInput from "./components/FormInput";
import UpdateForm from "./components/UpdateForm";

function App() {
 

  return (
    <div className="App">
    <Router >
      <Routes>
      {/* <Route path="/"  /> */}
      <Route path="/" element={<Data/>} />
      <Route path="/add" element={<FormInput/>} />
      <Route path="/update/:id" element={<UpdateForm/>} />
      </Routes>
    </Router>
    

    </div>
    
  );
}

export default App;
