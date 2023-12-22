"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const VegetarianBurrito = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-4 pl-20 bg-[#F9D548]">
        <h1 className="text-6xl font-extrabold text-blue-950">
          Vegetarian Burrito
        </h1>
      </div>

      <div className="flex p-4 pl-20 bg-[#F9D548]">
        {/* Division 1 - 1/3 width */}
        <div className="w-1/3">
          <Image
            src="/veg burrito.jpg" // Replace with the actual path to your image
            alt="Vegetarian Burrito Image"
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
          </p>

          <h2 className="text-3xl text-[#1D5198] font-bold">
            Why this Recipe?
          </h2>
          <p className="text-[#1D5198] leading-tight">
            Quick and easy, vegan bean and rice burritos are a perfect
            <br />
            vegetarian dinner idea. This basic recipe includes plenty of Mexican
            <br />
            spices, is a great way to use up leftover rice, and can be
            customized
            <br />
            to whatever you have on hand.
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
                2 cups Cooked Rice <br />
                2 tablespoon Chopped Fresh Cilantro <br />
                2 Limes Juiced <br />
                ½ Diced Medium Onion <br />
                3 – 4 Cloves Minced Garlic <br />
              </p>
            </div>

            {/* Second Column - 1/2 width */}
            <div className="w-1/2 p-4">
              <p className="text-[#1D5198]">
                2 tablespoon Vegetable Oil <br />
                1 can Drained Black Beans <br />
                4 large Temperatureortillas (10 inch) <br />
                ½ teaspoon Ground Cumin <br />
                1 tablespoon Hot Sauce and Chili Powder <br />
              </p>
            </div>
          </div>

          <div className="border-t border-gray-500 my-4 pl-20"></div>
          <div name="Instruction">
            <div name="header" className="p-4 pl-20">
              <h2 className="text-3xl text-[#1D5198] font-bold">Instruction</h2>
            </div>
            <div name="content" className="p-4 pl-20">
              <p className="text-[#1D5198]">
                1.In a large microwave-safe bowl, toss together cooked rice and
                fresh chopped cilantro, and drizzle with the lime juice. Heat in
                the microwave or on the stove just until hot and give it a quick
                stir. <br />
                2.In a separate large skillet, sauté the onion in vegetable oil
                or olive oil for 5 minutes, or until the onion is soft. Add the
                garlic and cook another minute.
                <br />
                3.Reduce the heat to medium-low, add the black beans or Pinto
                beans, and season with the Chili powder, cumin, and hot sauce,
                stirring to combine. You can add a bit of salt if you'd like,
                but you shouldn't need too much with all the other seasoning.
                Allow the beans to cook until heated through, about 5 minutes.
                <br />
                4.Spoon the cilantro-lime rice and the black bean mixture onto
                lightly warmed flour tortillas and add any additional toppings
                you want.
                <br />
                5.Wrap the burritos: Fold the short ends in, then fold one long
                side over the filling and gently push to ensure the fold is
                tight before rolling up the remainder of the burrito.
                <br />
                6.Cut in half and serve immediately.
                <br />
                <br />
                <h3 className="text-xl text-[#1D5198] font-bold">Plating:</h3>
                <br />
                Remember, the key to a great presentation is to balance colours,
                textures, and flavours. Feel free to get creative and adapt the
                plating based on the specific type of tortilla dish you're
                serving. Whether it's tacos, quesadillas, or enchiladas, a
                well-plated presentation can enhance the dining experience.
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
            <h2 className="text-3xl text-[#1D5198] font-bold">
              Notes From the Chef!
            </h2>
          </div>
          <div name="content" className="p-4 pl-20">
            <h3 className="text-xl text-[#1D5198] font-bold">
              Whole Grain Tortillas:
            </h3>
            <p className="text-[#1D5198]">
              Opt for whole grain or whole wheat tortillas for added fiber.
              They're a healthier choice compared to refined flour tortillas.
            </p>
            <h3 className="text-xl text-[#1D5198] font-bold">
              {" "}
              Layering Technique:{" "}
            </h3>
            <p className="text-[#1D5198]">
              When assembling the burrito, start with the sturdier ingredients
              like beans or rice at the base, followed by softer ingredients to
              prevent the tortilla from getting soggy.
            </p>
            <h3 className="text-xl text-[#1D5198] font-bold">
              Proper Rolling Technique:{" "}
            </h3>
            <p className="text-[#1D5198]">
              Fold the sides of the tortilla inward, then fold the bottom over
              the filling and roll tightly. This helps keep everything intact
              while eating.
            </p>
            <h3 className="text-xl text-[#1D5198] font-bold">
              Serving Accompaniments:{" "}
            </h3>
            <p className="text-[#1D5198]">
              Serve with a side of Greek yogurt or a light avocado-based
              dressing as a healthier alternative to sour cream.
            </p>
          </div>
          <div className="border-t border-gray-500 my-4 pl-20"></div>
          <div name="title" className="p-4 pl-20">
            <h2 className="text-3xl text-[#1D5198] font-bold">
              Fun Facts
            </h2>
          </div>
          <div name="content" className="p-4 pl-20">
          <ul className="list-disc text-[#1D5198] ml-4">
          <li>In Spanish, the word burrito means little donkey. It means the diminutive form of burro, or donkey.</li>
          <li>The name burrito possibly derives from the tendency of burritos to contain a lot of items at a time
             just like a donkey is able to carry a lot of burden</li>
          </ul>
          </div>
          <div className="border-t border-gray-500 my-4 pl-20"></div>
          <div name="title" className="p-4 pl-20">
            <h2 className="text-3xl text-[#1D5198] font-bold">
              Nutritional Facts
            </h2>
          </div>
          <div name="content" className="p-4 pl-20">
            <ul className="list-disc text-[#1D5198] ml-4">
              <li>
                <b>Calories</b>: Around 370 - 450 calories (Varies based on
                specific ingredients and amount used)
              </li>
              <li>
                <b>Protein</b>: Approximately 15 grams
              </li>
              <li>
                <b>Fat</b>: Roughly 10 grams
              </li>
              <li>
                <b>Carbohydrates</b>: About 68 grams
              </li>
              <li>
                <b>Fiber</b>: Around 19 grams
              </li>
            </ul>
            <p className="text-[#1D5198] mt-4">
              Keep in mind that these values are estimations and can vary based
              on factors like specific brands of ingredients, variations in
              sizes, and preparation methods. Adjustments may be necessary based
              on the actual ingredients used.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VegetarianBurrito;
