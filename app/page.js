// app/page.js
"use client";
import Homepage from "@/components/Homepage";
import Welcome from "@/components/Welcome";
import Login from "@/components/Login";
import Terms from "@/components/terms";
import Quizz from "@/components/Quizz";
import Image from "next/image";
import Head from "next/head";
import Signup from "@/components/Signup";
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
      {/* <Welcome /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      { <Terms /> }
      { <Homepage /> }
      {/* <Quizz /> */}
    </main>
  );
};

export default Home;
