"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const Bibimbap = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-4 pl-20 bg-[#F9D548]">
        <h1 className="text-6xl font-extrabold text-blue-950">Bibimbap</h1>
      </div>

      <div className="flex p-4 pl-20 bg-[#F9D548]">
        {/* Division 1 - 1/3 width */}
        <div className="w-1/3">
          <Image
            src="/bibimbap.jpg" // Replace with the actual path to your image
            alt="Bibimbap Image"
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
            Bibimbap (비빔밥), a vibrant Korean dish, intricately weaves
            together an
            <br />
            array of fresh vegetables, tender meats or tofu, and a spicy
            gochujang
            <br />
            sauce atop steamed rice. Beyond its visually striking presentation
            lies a
            <br />
            nutritional powerhouse, boasting an abundance of vitamins, minerals,{" "}
            <br />
            and antioxidants from its colourful ingredients. This one-bowl
            wonder <br />
            offers not just a meal but an exploration of flavours, textures, and
            the rich <br />
            tapestry of Korean culinary heritage.
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
                ½ cup Cooked Rice <br />
                1 cup Assorted Vegetables (spinach, carrots, bean sprouts,
                mushrooms, zucchini) <br />
                ¼ cup Marinated Beef or Tofu (for a vegetarian option) <br />
                1 Egg <br />
                1 tablespoon Gochujang (Korean red pepper paste) <br />
                1 tablespoon Soy Sauce <br />
              </p>
            </div>

            {/* Second Column - 1/2 width */}
            <div className="w-1/2 p-4">
              <p className="text-[#1D5198]">
                1 teaspoon Sesame Oil <br />
                1 teaspoon Sesame Seeds <br />
                1 Clove Garlic, Minced <br />
                ½ teaspoon Sugar <br />
                1 teaspoon Rice Vinegar <br />
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
                Prepare the Vegetables:
              </h3>
              <br />
              <p className="text-[#1D5198]">
                1. Julienne or thinly slice the carrots and zucchini. <br />
                2. Blanch spinach in boiling water for a minute, then drain and
                squeeze out excess water.
                <br />
                3. Blanch bean sprouts in boiling water for 2-3 minutes, then
                drain.
                <br />
                4. Sauté or stir-fry the mushrooms until cooked, seasoned
                lightly with soy sauce and garlic.
                <br />
                <br />
                <h3 className="text-xl text-[#1D5198] font-bold">
                  Prepare the Protien:
                </h3>
                <br />
                1. If using beef, stir-fry it in a pan until cooked through. If
                using tofu, sauté until lightly browned.
                <br />
                <br />
                <h3 className="text-xl text-[#1D5198] font-bold">
                  Prepare the Gochujang Sauce:
                </h3>
                <br />
                1. In a small bowl, mix Gochujang with sesame oil, sesame seeds,
                sugar, rice vinegar (if using), and a teaspoon of water to
                achieve a paste-like consistency.
                <br />
                <br />
                <h3 className="text-xl text-[#1D5198] font-bold">
                  Fry the Egg:
                </h3>
                <br />
                1. Heat a small pan with vegetable oil over medium heat. Crack
                the egg into the pan and cook until the whites are set but the
                yolk remains runny.
                <br />
                <br />
                <h3 className="text-xl text-[#1D5198] font-bold">
                  Plating & Serving:
                </h3>
                <br />
                1. Place the cooked rice in a serving bowl.
                <br />
                2. Arrange the cooked vegetables and protein on top of the rice
                in separate sections.
                <br />
                3. Add the fried egg on one side.
                <br />
                4. Drizzle the Gochujang sauce over the vegetables and
                meat/tofu.
                <br />
                Mix all the ingredients together thoroughly just before eating
                to combine flavors and textures.
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
              Veggie Variety:
            </h3>
            <p className="text-[#1D5198]">
              Aim for a diverse selection of vegetables for a colorful and
              nutritious bowl. Use what you have on hand—carrots, spinach,
              mushrooms, and bean sprouts are classic choices, but feel free to
              add others like bell peppers or cucumbers.
            </p>
            <h3 className="text-xl text-[#1D5198] font-bold">
              {" "}
              Gochujang Blend:{" "}
            </h3>
            <p className="text-[#1D5198]">
              Customize your Gochujang sauce by adjusting its consistency and
              spiciness. Add a splash of rice vinegar for tanginess or a touch
              of sugar for balance. Don't be afraid to tailor it to your taste.
            </p>
            <h3 className="text-xl text-[#1D5198] font-bold">
              Perfect Egg Fry:{" "}
            </h3>
            <p className="text-[#1D5198]">
              For a traditional bibimbap, fry the egg sunny-side-up with a runny
              yolk. Cook it gently, covering the pan for a minute to ensure the
              whites are set but the yolk remains runny.
            </p>
            <h3 className="text-xl text-[#1D5198] font-bold">
              Customize to Taste:{" "}
            </h3>
            <p className="text-[#1D5198]">
              Feel free to experiment with ingredients and proportions.
              Personalize the bowl to suit your preferences for spice level,
              types of veggies, or protein choices.
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
                <b>Calories</b>: Around 500 - 600 calories (Varies based on
                specific ingredients and amount used)
              </li>
              <li>
                <b>Protein</b>: Approximately 25 grams
              </li>
              <li>
                <b>Fat</b>: Roughly 20 grams
              </li>
              <li>
                <b>Carbohydrates</b>: About 80 grams
              </li>
              <li>
                <b>Fiber</b>: Around 8 grams
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

export default Bibimbap;
