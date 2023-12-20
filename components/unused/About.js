import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar />
      {/* Create header and body text */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="text-center max-w-6xl mx-auto px-6">
          <h1 className="text-[#0A2A67] font-black text-7xl pb-8">
            Get To Know Us Better!
          </h1>
          <p className="text-blue-900 text-xl pb-10">
            Welcome to <span className="font-bold">CleanCookBook</span>, your
            gateway to a healthier, happier you through the magic of delicious,
            nutritious recipes. We are more than just a digital platform; we are
            your partner in your journey towards a wholesome and fulfilling
            lifestyle.
          </p>
          {/* mission and vision containers  */}
          <div className="mt-8 flex justify-between">
            <div className="w-1/2 p-4">
              <h2 className="text-[#0A2A67] font-extrabold text-4xl pb-2">
                <span className="text-white">Our </span>Mission
              </h2>
              <p className="text-blue-900">
                To make healthy eating easy, enjoyable, and tailored to your
                unique preferences and goals.
              </p>
              <div className="flex justify-center">
                <img
                  className="w-[363px] h-[236px] rounded-[20px] drop-shadow-lg m-8"
                  src="aboutPage.jpg"
                  alt="About Page Image"
                />
              </div>
            </div>
            <div className="w-1/2 p-4">
              <h2 className="text-[#0A2A67] font-extrabold text-4xl pb-2">
                <span className="text-white">Our </span>Vision
              </h2>
              <p className="text-blue-900">
                At <span className="font-bold">CleanCookBook</span>, we believe
                that eating well should never be a compromise between taste and
                health. We envision a world where everyone can access a treasure
                trove of nutritious recipes, and expert guidance, making it
                effortless to embrace a balanced and vibrant way of life.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;