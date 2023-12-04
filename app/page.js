import Welcome from "@/components/Welcome";
import Signup from "@/components/Signup";
import Login from "@/components/Login";
import Homepage from "@/components/Homepage";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <main className="">
      {/* <Welcome /> */}
      <Login />
      {/* <Signup /> */}
      {/* <Homepage /> */}
    </main>
  );
}
