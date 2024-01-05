// app/page.js
"use client";
import Welcome from "@/components/Welcome";
import BPAnnouncement from "@/components/BPAnnouncement";

const Home = () => {
  return (
    <main className="">
      {/* <Welcome /> */}
      <BPAnnouncement />
    </main>
  );
};

export default Home;
