// app/page.js
"use client";
import Welcome from "@/components/Welcome";
import viewUserFeedback from "@/components/viewUserFeedback";

const Home = () => {
  return (
    <main className="">
      {/* <Welcome /> */}
      <viewUserFeedback />
    </main>
  );
};

export default Home;
