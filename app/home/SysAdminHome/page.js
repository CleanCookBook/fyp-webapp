"use client";
import Footer from "@/components/Footer";
import SysAdminNavBar from "@/components/SysAdminNavBar";
import Link from "next/link";

const SysAdminHome = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <SysAdminNavBar className="fixed top-0 left-0 right-0" />
      <div className="flex flex-col items-center flex-1">
        <h2 className="text-6xl font-black mt-20">What Shall We Do Today?</h2>
        <div className="flex space-x-4 py-10">
          <button className="bg-white hover:bg-gray-200 rounded-lg py-8 px-8 text-[#0A2A67] font-black text-2xl">
          <Link href="/AccountInfo/ViewUser" className="text-[#0A2A67]">
            View Users
            </Link>
          </button>

          <button className="bg-white hover:bg-gray-200 rounded-lg py-8 px-8 text-[#0A2A67] font-black text-2xl">
          <Link href="/AccountInfo/ViewPartner" className="text-[#0A2A67]">
            View Partners
            </Link>
          </button>
        
          <button className="bg-white hover:bg-gray-200 rounded-lg py-8 px-8 text-[#0A2A67] font-black text-2xl">
          <Link href="/AccountInfo/ReviewInfo" className="text-[#0A2A67]">
            Review Partner's
            <br /> Application
            </Link>
          </button>
        </div>
      </div>
      <Footer className="fixed bottom-0 left-0 right-0" />
    </div>
  );
};

export default SysAdminHome;
