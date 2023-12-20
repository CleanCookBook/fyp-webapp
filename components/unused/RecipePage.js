import Navbar from "@/components/Navbar";
import Footer from "./Footer";

const RecipeDetails = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-4 pl-20 bg-[#F9D548]">
        <h1 className="text-6xl font-extrabold text-blue-950">
          Homemade Fish & Chips
        </h1>
      </div>

      <div className="flex p-4 pl-20 bg-[#F9D548]">
        {/* Division 1 - 1/3 width */}
        <div className="w-1/3">
          <img
            src="Fish&chips.jpg" // Replace with the actual path to your image
            alt="Homemade Fish & Chips Image"
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
            This recipe for 2 is a healthy version of the otherwise stodgy and
            oil
            <br />
            soaked fish and chips. The fish is lightly coated in breadcrumbs and
            <br />
            baked, and the chips are tossed in a small amount of oil and
            <br />
            cooked in the oven until golden. The peas are garden peas, crushed
            <br />
            and mixed with a bit of butter and mint. Nutritious, but still hits
            the
            <br />
            spot when that chippy craving strikes.
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
                4 white Fish Fillet <br />
                100 g Breadcrumbs <br />
                4 Large Potatoes <br />
                400g Frozen Garden Peas <br />
              </p>
            </div>

            {/* Second Column - 1/2 width */}
            <div className="w-1/2 p-4">
              <p className="text-[#1D5198]">
                2 Eggs <br />
                Pinch of Salt and Pepper
                <br />
                2 teaspoons of Oil <br />
                20g Butter <br />
              </p>
            </div>
          </div>

          <div className="border-t border-gray-500 my-4 pl-20"></div>
          <div name="Instruction">
            <div name="header" className="p-4 pl-20">
              <h2 className="text-3xl text-[#1D5198] font-bold">Instruction</h2>
            </div>
            <div name="content" className="p-4 pl-20">
              <h3 className="text-xl text-[#1D5198] font-bold">
                For the chips(French Fries):
              </h3>
              <br />
              <p className="text-[#1D5198]">
                1.Preheat your oven to 220°C (425°F). <br />
                2.Wash and peel the potatoes. Cut them into even-sized strips
                (thicker cuts for a fluffier interior).
                <br />
                3.Soak the cut potatoes in a bowl of cold water for about 30
                minutes to remove excess starch.
                <br />
                4.After soaking, drain the water and thoroughly dry the potato
                strips with paper towels.
                <br />
                5.Toss the dried potato strips in a bowl with 1 tablespoon of
                oil, salt, and pepper until evenly coated.
                <br />
                6.Spread the potatoes on a baking tray lined with parchment
                paper.
                <br />
                7.Bake for 30-35 minutes or until golden brown and crispy,
                flipping them halfway through for even cooking.
                <br />
                <br />
                <h3 className="text-xl text-[#1D5198] font-bold">
                  For the Fish:
                </h3>
                <br />
                1. Pat the fish fillets dry with paper towels.
                <br />
                2. In separate shallow dishes, prepare two coatings: one with
                plain flour seasoned with salt, pepper, and dried mint, and the
                other with beaten eggs.
                <br />
                3. Dip each fillet first into the seasoned flour, then into the
                beaten egg, and finally coat it thoroughly with breadcrumbs.
                <br />
                4. Heat the remaining oil in a frying pan over medium-high heat.
                <br />
                5. Once the oil is hot, carefully add the breaded fish fillets
                to the pan.
                <br />
                6. Fry each fillet for about 3-4 minutes on each side until
                golden brown and the fish is cooked through. Place them on a
                paper towel-lined plate to drain excess oil.
                <br />
                <br />
                <h3 className="text-xl text-[#1D5198] font-bold">
                  For the Peas:
                </h3>
                <br />
                1. Boil the frozen garden peas according to the package
                instructions.
                <br />
                2. Drain the peas and return them to the pan.
                <br />
                3. Add the butter and a pinch of salt and pepper to the peas.
                Mash lightly or blend for a smoother consistency if preferred.
                <br />
                <br />
                <h3 className="text-xl text-[#1D5198] font-bold">Plating:</h3>
                <br />
                Serve the crispy fish fillets alongside the golden brown chips.
                <br />
                Plate a portion of mashed peas on each serving plate.
                <br />
                Garnish with a wedge of lemon or your preferred condiments like
                tartar sauce or malt vinegar.
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
              Selecting the Fish:
            </h3>
            <p className="text-[#1D5198]">
              Opt for fresh, firm white fish like cod, haddock, or halibut. The
              freshness of the fish is key to a great dish.
            </p>
            <h3 className="text-xl text-[#1D5198] font-bold">
              {" "}
              Double Fry Technique:{" "}
            </h3>
            <p className="text-[#1D5198]">
              Fry the fish twice for that perfect crunch. After an initial fry
              to cook the fish, let it rest, then fry it again briefly just
              before serving for that ultimate crispy texture.
            </p>
            <h3 className="text-xl text-[#1D5198] font-bold">
              Temperature Matters:{" "}
            </h3>
            <p className="text-[#1D5198]">
              Maintain a consistent oil temperature (around 350-375°F or
              175-190°C) when frying. This ensures the fish cooks evenly and the
              batter turns golden brown without burning.
            </p>
            <h3 className="text-xl text-[#1D5198] font-bold">
              Oil Selection:{" "}
            </h3>
            <p className="text-[#1D5198]">
              Use oils with high smoke points like peanut, sunflower, or canola
              oil for frying. They can withstand higher temperatures without
              imparting unwanted flavours.
            </p>
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
                <b>Calories</b>: Around 2624 calories
              </li>
              <li>
                <b>Protein</b>: Approximately 99 grams
              </li>
              <li>
                <b>Fat</b>: Roughly 25 grams
              </li>
              <li>
                <b>Carbohydrates</b>: About 397 grams
              </li>
              <li>
                <b>Fiber</b>: Around 51 grams
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

export default RecipeDetails;
