import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";


const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
      });

    const {username, password} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name]
        : e.target.value});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
        const body = { username, password};
        const response = await fetch(
            "http://localhost:3001/auth/register",
            {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
            }
        );
        const parseRes = await response.json();

        if(parseRes.jwtToken){
            localStorage.setItem("token", parseRes.jwtToken);
            setAuth(true);
        } else {
            setAuth(false);
            console.error(parseRes);
        }
        
        } catch (err) {
        console.error(err.message);
        }
      };

    return (
        <Fragment>
            <h1> Create User </h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username" onChange={e => onChange(e)} />
                <input type="password" name="password" placeholder="password" onChange={e => onChange(e)} autoComplete="on" />
                <button>Register</button>
            </form>
            <Link to="/login">Login</Link>
        </Fragment>
    )
}

export default Register;