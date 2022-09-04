import React, { useEffect, useState } from 'react';

const Home = ({setAuth}) => {

  const [name, setName] = useState("")

  async function getName() {
    try {
      const response = await fetch("http://localhost:3001/dashboard/", {
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json();
      setName(parseRes.username);
    } catch (err) {
      console.error(err.message)
    }
  };

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  }

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
  <h1>Home</h1>
  <h2>Welcome {name}</h2>
  <button onClick={e => logout(e)}>Log out</button>
  </>
  )
};

export default Home;