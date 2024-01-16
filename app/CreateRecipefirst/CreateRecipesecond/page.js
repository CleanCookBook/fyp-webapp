"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import BPNavBar from "@/components/BPNavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

const CreateRecipesecond = () => {
  const router = useRouter();
  const [recipeSteps, setRecipeSteps] = useState("");
  const [nutritionalFacts, setNutritionalFacts] = useState("");
  const [funFacts, setFunFacts] = useState("");
  const [tips, setTips] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
 

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/check-auth", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          router.push('/loginPage');
        }
      } catch (error) {
        console.error('Error during authentication check:', error.message);
      } finally {
        // Set loading to false when authentication check is complete
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);
  if (isLoading) {
    // Optional: render a loading spinner or message
    return <p>Loading...</p>;
  }
  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    router.push('/loginPage');
    // No need to return anything here
  }

  const handleRecipeSteps = (e) => {
    setRecipeSteps(e.target.value);
  };

  const handleNutritionalFacts = (e) => {
    setNutritionalFacts(e.target.value);
  };

  const handleFunFacts = (e) => {
    setFunFacts(e.target.value);
  };

  const handleTips = (e) => {
    setTips(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const recipeData = {
      recipeSteps,
      nutritionalFacts,
      funFacts,
      tips,
    };
  
    try {
      const response = await fetch("http://localhost:3001/api/recipe/createRecipeSecond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(recipeData), // Convert to JSON string
      });
  
      console.log("Response status:", response.status);
  
      if (response.ok) {
        console.log("Recipe created successfully!");
        router.push('/home/BPHomepage');
      } else {
        try {
          const errorData = await response.json();
          console.error("Error creating recipe:", errorData);
          // Handle error as needed
        } catch (error) {
          console.error("Error creating recipe:", response.statusText);
          // Handle error as needed
        }
      }
    } catch (error) {
      console.error("Error creating recipe:", error.message);
      // Handle error as needed
    }
  };

  return (
    
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <BPNavBar className="fixed top-0 left-0 right-0" />
        <div className="mt-10 ml-8">
          <h2 className="text-5xl font-black pb-8">
            Create Your Recipe{" "}
          </h2>
        </div>
        <div className="w-full mx-auto flex items-center px-8 lg:px-20 mt-8">
          <div className="w-1/2 border-r border-gray-400 pr-8 -mt-[6px]">
            <form onSubmit={handleSubmit} className="flex flex-col items-start mb-8">
              <label className="text-blue-950 text-lg font-medium mb-2 self-start">
                Enter Recipe Steps :
              </label>
              <div className="flex items-center justify-center w-full h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
                <textarea
                  id="recipeSteps"
                  value={recipeSteps}
                  onChange={handleRecipeSteps}
                  className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                  placeholder="Enter your Recipe Steps"
                />
              </div>
              <label className="text-blue-950 text-lg font-medium mb-2 mt-8 self-start">
                Enter Nutritional Facts :
              </label>
              <div className="flex items-center justify-center w-full h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
                <textarea
                  id="nutritionalFacts"
                  value={nutritionalFacts}
                  onChange={handleNutritionalFacts}
                  className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                  placeholder="Enter your Nutrional Facts"
                />
              </div>
            </form>
          </div>
          <div className="w-1/2 pl-8 -mt-[34px]">
            <form className="flex flex-col items-start mb-8">   
              <label className="text-blue-950 text-lg font-medium mb-2 mt-8 self-start">
                Enter Fun Facts :
              </label>
                <div className="flex items-center justify-center w-full h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
                  <textarea
                    id="funFacts"
                    value={funFacts}
                    onChange={handleFunFacts}
                    className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                    placeholder="Enter your Fun Facts"
                  />
                </div>
                <label className="text-blue-950 text-lg font-medium mb-2 mt-8 self-start">
                  Enter Tips from the Chef :
                </label>
                <div className="flex items-center justify-center w-full h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
                  <textarea
                    id="tips"
                    value={tips}
                    onChange={handleTips}
                    className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                    placeholder="Enter Tips from Chef"
                  />
                </div>
            </form>
          </div>
        </div>
        <div className="w-full mt-auto flex justify-between px-4 py-4">
          <div>
            <Link href="/CreateRecipefirst">
              <button className="w-[259px] h-10 bg-blue-950 hover:bg-[#154083] text-white font-bold text-lg rounded-[10px] shadow ml-16">
                Back
              </button>
            </Link>
          </div>
          <div>
            <Link href="/home/BPHomepage">
              <button 
                onClick={handleSubmit}
                className="w-[259px] h-10 bg-blue-950 hover:bg-[#154083] text-white font-bold text-lg rounded-[10px] shadow -mt-7 mr-16">
                Submit
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-auto">
            <Footer />
        </div>
    </div>
  );
};

export default CreateRecipesecond;
