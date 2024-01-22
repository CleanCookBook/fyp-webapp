// app/page.js
"use client";
import CreateUserFeedback from "@/components/CreateUserFeedback";
import Welcome from "@/components/Welcome";

const Home = () => {
  return (
    <main className="">
      {/* <Welcome /> */}
      <CreateUserFeedback />
    </main>
  );
};

export default Home;
