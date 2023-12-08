import Navbar from "./Navbar";
import Footer from "./Footer";

const RecipeList = () => {
  const input = "Fish";
  const recipeList = [
    "Recipe 1",
    "Recipe 2",
    "Recipe 3",
    "Recipe 4",
    "Recipe 5",
  ];

  return (
    <section className="flex flex-col h-screen bg-[#F9D548]">
      <Navbar />
      <div className="flex flex-col justify-start items-center">
        <h1 className="items-start pt-8 text-7xl text-[#0A2A67] font-black">
          {input}
        </h1>
        <div className="mt-8 bg-white w-[70%] max-w-[1114px]">
          {recipeList.map((recipe, index) => (
            <div
              key={index}
              className="flex items-center h-[60px] border-b-3 border-black-300"
            >
              <p className="ml-2 text-black text-xl font-medium">{recipe}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default RecipeList;
