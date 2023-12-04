import Navbar from "./Navbar";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <div className="flex flex-col h-screen bg-[#F9D548]">
      <Navbar />
      <div className="flex flex-col h-screen justify-center items-center bg-[#F9D548] text-[#0A2A67]">
        <h1 className="flex text-7xl font-black py-5 item-center">
          Whats Cooking Today?
        </h1>
        <div className="w-[748px] h-[38px] bg-white rounded-[20px]">
          <div>
            <div className="flex items-center text-sm p-2 pl-9 text-stone-300">
              <p>Search our library of recipes</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
