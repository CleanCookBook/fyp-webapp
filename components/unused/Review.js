import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState } from "react";

const Review = () => {
    const [wordCount, setWordCount] = useState(50); // Initialize word count to 50
  
    const handleWordCount = (event) => {
      const words = event.target.value.split(/\s+/).filter(word => word);
      setWordCount(50 - words.length);
    };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      {/* Navbar */}
      <Navbar />
        <div className="mt-10 ml-8">
            <h1 className="text-7xl font-extrabold text-blue-950">ABC soup</h1>
            <div style={{ fontSize: "50px" }}>
                <span style={{ color: "#172554" }}>
                &#9733;&nbsp;&nbsp;&#9733;&nbsp;&nbsp;&#9733;&nbsp;&nbsp;&#9733;&nbsp;&nbsp;                     
                </span>
                <span style={{ color: "white" }}>&#9733;</span>
            </div>
        </div>

      <div className="container mx-auto px-4">
        <section className="mt-1">
          <h2 className="text-3xl font-bold mb-4 text-blue-950 text-center">Read what others are saying!</h2>

          {/* Comments section - placeholder for dynamic content */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <img src="profile logo.png" alt="Profile Picture" className="w-16 h-16 rounded-full mr-4" />
              <p className="text-blue-950 font-semibold">This recipe exceeded expectations! The simple instructions made it a breeze to whip up, and the end result was a burst of delicious flavors. 
              It's now a regular in my repertoire – a go-to for busy days or when I crave a satisfying, homemade meal. Highly recommend for both novice and experienced cooks!</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <img src="profile logo.png" alt="Profile Picture" className="w-16 h-16 rounded-full mr-4" />
              <p className="text-blue-950 font-semibold">Sensational! This recipe is a culinary triumph. From effortless preparation to the sublime fusion of flavors, it's a gastronomic masterpiece. 
              Quick and rewarding, it's a go-to for busy nights. Bravo to the chef for crafting a dish that's both accessible and undeniably delicious – a true winner in my kitchen!</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <img src="profile logo.png" alt="Profile Picture" className="w-16 h-16 rounded-full mr-4" />
              <p className="text-blue-950 font-semibold">A culinary revelation! This recipe marries simplicity with extraordinary taste. Effortless to create, yet bursting with flavor, it's a game-changer. Perfect for those hectic evenings when you crave a homemade treat. 
              Kudos to the chef for crafting a dish that's both accessible and incredibly satisfying – a new favorite in my kitchen!</p>
            </div>
            
           
            {/* Add more comment sections as needed */}
          </div>
        </section>
        <section className="flex justify-center mt-4">
        
            <button
            className="text-blue-950 mr-4"> &lt;
            </button>
            <button
            className="text-blue-950 mr-4"> 1
            </button>
            <button
            className="text-blue-950 mr-4"> 2
            </button>
            <button
            className="text-blue-950 mr-4"> 3
            </button>
            <button
            className="text-blue-950 mr-4"> &gt;
            </button>
        </section>

        <section className="mt-8">
        {/* Input field for user reviews - placeholder for dynamic form */}
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
            <input
            className="w-full h-25 p-2 border rounded-md"
            placeholder="Let us know how you feel!..."
            maxLength={wordCount === 50 ? 300 : null} // Allow 300 characters initially (50 words)
            onInput={handleWordCount}
            />
                <p className="text-gray-500 text-sm mt-2">
                Words left(Max 50 words):
                <span style={{ marginLeft: '5px', marginRight: '10px', color: wordCount >= 0 ? 'inherit' : 'red' }}>
                    {wordCount >= 0 ? wordCount : "0 !! "}
                </span>
                </p>
                <button
                    className="w-[100px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow mt-4 self-end"
                >
                    Submit
                </button>
            </div>
        </section>
    </div>

    <div className="mt-auto">
        <Footer />
    </div>
    
    </div>
  );

};

export default Review;
