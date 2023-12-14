// app/page.js
"use client";
import Welcome from "@/components/Welcome";

//This too yall can delete
//import { useEffect, useState } from 'react';

const Home = () => {
  //Yall can delete i leave here cos this is some of my backened i will need for my future reference yeah
  /* const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the API on the client side
    fetch('http://localhost:3001/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);  */

  return (
    <main className="">
      <Welcome />
    </main>
  );
};

export default Home;
