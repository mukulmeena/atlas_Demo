import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const fileLoader = async () => {
    const response = await axios.post(
      "https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/data-jjxxk/auth/providers/api-key/login",
      {
        key: "x263VVYoFaIjOsvsD2gQUmzLrNGs7uRNLmFEX0qH8WiMt4kOVHNXD4cSAY2zcILY",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const Data_Accounts = await axios.post(
      "https://data.mongodb-api.com/app/data-jjxxk/endpoint/data/v1/action/find",
      {
        collection: "File_Definiton_File",
        database: "Demo",
        dataSource: "Cluster0",
      },
      {
        headers: {
          Authorization: "Bearer " + response.data.access_token,
          "Content-Type": "application/json",
        },
      }
    );
    const demo = await axios.post(
      "https://data.mongodb-api.com/app/data-jjxxk/endpoint/data/v1/action/find",
      {
        collection: "Accounts_FDF",
        database: "Demo",
        dataSource: "Cluster0",
      },
      {
        headers: {
          Authorization: "Bearer " + response.data.access_token,
          "Content-Type": "application/json",
        },
      }
    );
    setData(demo.data.documents);
    setData1(Data_Accounts.data.documents);
  };

  useEffect(() => {
    fileLoader();
  });
  return (
    <div className="App">
      {JSON.stringify(data)} *************************************
      {JSON.stringify(data1)}
    </div>
  );
}

export default App;
