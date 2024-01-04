// app/page.js
"use client";
import Welcome from "@/components/Welcome";
import BusinessPartnerSignup from "@/components/BusinessPartnerSignup";

const Home = () => {
  return (
    <main className="">
      <BusinessPartnerSignup />
      <Welcome />
    </main>
  );
};

export default Home;
