import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import axiosWithAuth from "./axiosWithAuth";

function App() {
  const user = { username: "hugo3", password: "hugo3" };
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    console.log("getting");
    axios
      .post("http://localhost:3300/api/auth/login", user)

      .then(response => {
        console.log("LOGIN RESPONSE: ", response);
        localStorage.setItem("token", response.data.token);

        axiosWithAuth()
          .get("http://localhost:3300/api/jokes")
          .then(jokes => {
            console.log(jokes);
            setJokes(jokes.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        console.log("LOGIN ERROR: ", error);
      });
  }, []);

  return (
    <>
      <div className="App">
        {jokes.map(i => (
          <p key={i.id}>{i.joke}</p>
        ))}
      </div>
    </>
  );
}

export default App;
