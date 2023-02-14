import React,{useState,useEffect} from 'react'
import api from "../api/data";


function Data() {

  const [formList, setFormList] = useState([]);


    //Retrieve data
    const retrieveData = async () => {
      const response = await api.get("/data");
      console.log(response)
      return response.data;
    };
  
    useEffect(() => {
      const getAllData = async () => {
        const allData = await retrieveData();
        console.log(allData)
        if (allData) setFormList(allData);
      };
  
      getAllData();
      console.log(formList)
    }, []);

  return (
    <div>List of Data
    {
      formList.map((entry) => {
        return <div id={entry.id}>{entry.inputEmail}</div>
      })
    }
    </div>
  )
}

export default Data