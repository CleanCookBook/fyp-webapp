"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const ABCsoup = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-4 pl-20 bg-[#F9D548]">
        <h1 className="text-6xl font-extrabold text-blue-950">
          ABC Soup
        </h1>
      </div>

      <div className="flex p-4 pl-20 bg-[#F9D548]">
        {/* Division 1 - 1/3 width */}
        <div className="w-1/3">
          <Image
            src="/ABC soup.jpg" // Replace with the actual path to your image
            alt="ABC soup Image"
            width={500}
            height={500}
            className="w-full max-w-screen-xl mx-auto rounded-2xl shadow-2xl shadow-black"
          />
        </div>

        {/* Division 2 - 2/3 width */}
        <div className="w-2/3  justify-center text-center">
          {/* Content for Division 2 with blue-colored stars */}
          <div style={{ fontSize: "50px" }}>
            <span style={{ color: "#172554" }}>
              &#9733;&#9733;&#9733;&#9733;
            </span>
            <span style={{ color: "white" }}>&#9733;</span>
          </div>
          <p className="text-blue-950">
            {" "}
            Read the{" "}
            <a href="/reviews" style={{ textDecoration: "underline" }}>
              reviews
            </a>
            .
          </p>

          <h2 className="text-3xl text-[#1D5198] font-bold">
            Why this Recipe?
          </h2>
          <p className="text-[#1D5198] leading-tight mt-2">
            ABC soup is a nourishing soup cooked with potatoes, carrots, 
            <br />
            tomatoes, onions and pork ribs/bones or chicken. This nutritious 
            <br />
            ABC soup with many vitamins contained therein is baby/child
            <br />
            friendly. It could also be easily turned into a vegetarian soup by
            <br />
            omitting the meat.
            <br />
          </p>
        </div>
      </div>

      <div className="flex">
        {/* First Column - 1/3 width */}
        <div className="w-2/5 p-4">
          <div name="title" className="p-4 pl-20">
            <h2 className="text-3xl text-[#1D5198] font-bold">Ingredients</h2>
          </div>
          <div name="content" className="flex">
            {/* First Column - 1/2 width */}
            <div className="w-1/2 p-4 pl-20">
              <p className="text-[#1D5198]">
                1 cup of sliced white mushrooms <br />
                1 cup of corn <br />
                1 large carrot<br />
                1 onion <br />
              </p>
            </div>

            {/* Second Column - 1/2 width */}
            <div className="w-1/2 p-4">
              <p className="text-[#1D5198]">
                8 cups of chicken broth <br />
                Pinch of Salt and Pepper
                <br />
                1 large potato <br />
                1 tablespoon of  dried thyme <br />
                1 bayleaf(optional) <br />
              </p>
            </div>
          </div>

          <div className="border-t border-gray-500 my-4 pl-20"></div>
          <div name="Instruction">
            <div name="header" className="p-4 pl-20">
              <h2 className="text-3xl text-[#1D5198] font-bold">Steps</h2>
            </div>
            <div name="content" className="p-4 pl-20">
              <p className="text-[#1D5198]">
                1.In a large pot, cook the chopped bacon over medium heat until it becomes crispy. Remove some of the excess fat if there's too much. 
                <br />
                2.Add the diced onions and minced garlic to the pot, sauteing until the onions are translucent.
                <br />
                3. Add the sliced mushrooms, carrots, and potatoes to the pot. Stir and cook for a few minutes to allow the vegetables to slightly soften.
                <br />
                4.Pour in the chicken or vegetable broth, and add the bay leaf and dried thyme if using. Bring the soup to a boil.
                <br />
                5.Reduce the heat to low, cover the pot, and let it simmer for about 15-20 minutes or until the vegetables are tender.
                <br />
                6.Add the corn kernels to the soup and simmer for an additional 5 minutes.
                <br />
                7.Season the soup with salt and pepper to taste. Adjust the seasoning as needed.
                <br />
                8.Remove the bay leaf if used, and discard it.
                <br />
                9.Serve the ABC soup hot, garnished with fresh herbs if desired.
                <br />
                <br />
                <h3 className="text-xl text-[#1D5198] font-bold">Plating:</h3>
                <br />
                Remember, the key is to keep it simple and let the natural colors and textures of the ingredients shine through. 
                This approach not only makes the dish visually appealing but also enhances the overall dining experience.
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>

        <div className="border-l border-gray-500"></div>

        {/* Second Column - 2/3 width */}
        <div className="w-3/5 p-4">
        <div name="title" className="p-4 pl-20">
            <h2 className="text-3xl text-[#1D5198] font-bold">Notes From the Chef!</h2>
          </div>
          <div name="content" className="p-4 pl-20">
              <h3 className="text-xl text-[#1D5198] font-bold">Selecting Stock/Broth: </h3>
                  <p className="text-[#1D5198]">Use homemade chicken or vegetable broth for richer flavor. If using store-bought, choose low-sodium options to control salt levels.</p>
                  <h3 className="text-xl text-[#1D5198] font-bold"> Selecting Mushrooms: </h3>
                  <p className="text-[#1D5198]">Consider using a mix of different mushrooms for depth of flavor. Shiitake or cremini mushrooms can add a more robust taste.</p>
                  <h3 className="text-xl text-[#1D5198] font-bold">Herbs: </h3>
                  <p className="text-[#1D5198]">Fresh herbs like parsley or thyme can elevate the soup. Add them towards the end of cooking for a burst of freshness.</p>
                  <h3 className="text-xl text-[#1D5198] font-bold">Serve Fresh: </h3>
                  <p className="text-[#1D5198]">ABC soup is best enjoyed fresh, but you can prepare the base in advance and add fresh vegetables just before serving for optimal texture.</p>

            
         
        </div>
        <div className="border-t border-gray-500 my-4 pl-20"></div>
        <div name="title" className="p-4 pl-20">
            <h2 className="text-3xl text-[#1D5198] font-bold">Nutritional Facts</h2>
          </div>
          <div name="content" className="p-4 pl-20">
  <ul className="list-disc text-[#1D5198] ml-4">
    <li><b>Calories</b>: Approximately 200-250 calories</li>
    <li><b>Protein</b>: 8-10 grams</li>
    <li><b>Fat</b>: 8-10 grams</li>
    <li><b>Carbohydrates</b>: About 397 grams</li>
    <li><b>Fiber</b>: 4-6 grams</li>
  </ul>
  <p className="text-[#1D5198] mt-4">
    Keep in mind that these values are estimations and can vary based on factors like specific brands of ingredients, variations in sizes, and preparation methods. Adjustments may be necessary based on the actual ingredients used.
  </p>
</div>


      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ABCsoup;
