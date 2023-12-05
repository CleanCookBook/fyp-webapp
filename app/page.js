import Welcome from "@/components/Welcome";
import Signup from "@/components/Signup";
import Login from "@/components/Login";
import Homepage from "@/components/Homepage";
import Image from "next/image";
import Head from "next/head";
import About from "@/components/About";

export default function Home() {
  return (
    <main className="">
      {/* <Welcome /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <Homepage /> */}
      <About />
    </main>
  );
}
