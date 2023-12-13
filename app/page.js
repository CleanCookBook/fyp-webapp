// app/page.js
"use client";
import Welcome from "@/components/Welcome";
import NewsFeed from "@/components/NewsFeed";
import Bibimbap from "@/components/Bibimbap";
import VegetarianBurrito from "@/components/VegetarianBurrito";

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
      <Bibimbap />
      <VegetarianBurrito />
      {/* <NewsFeed /> */}
    </main>
  );
};

export default Home;
