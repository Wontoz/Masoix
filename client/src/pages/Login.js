import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({setAuth}) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const {username, password} = inputs

  const onChange = e => {
    setInputs({...inputs, [e.target.name]
    : e.target.value});
};

const handleSubmit = async e => {
  e.preventDefault();
  try {
    const body = { username, password};
    const response = await fetch(
        "http://localhost:3001/auth/login",
        {
          method: "POST",
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
  );

  const parseRes = await response.json();
  console.log(parseRes);
  localStorage.setItem("token", parseRes);

  setAuth(true);
  
  } catch (err) {
    console.error(err.message);
  }
};

    return (
      <>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="username" onChange={e => onChange(e)} />
        <input type="password" name="password" placeholder="password" onChange={e => onChange(e)} autoComplete="on" />
        <button>Log in</button>
      </form>
      <Link to="/register">Register</Link>

      </>
      )
  };
  
  export default Login;