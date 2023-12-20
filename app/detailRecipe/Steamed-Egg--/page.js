"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from 'next/image';

const steamedegg = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-4 pl-20 bg-[#F9D548]">
        <h1 className="text-6xl font-extrabold text-blue-950">
          Steamed egg
        </h1>
      </div>

      <div className="flex p-4 pl-20 bg-[#F9D548]">
        {/* Division 1 - 1/3 width */}
        <div className="w-1/3">
          <Image
            src="/steamed egg.jpg" // Replace with the actual path to your image
            width={500}
            height={500}
            alt="Steamed egg Image"
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
            Soft, silky and smooth steamed egg is commonly cooked in many 
            <br />
            Chinese households. Prevent watery eggs by using the golden ratio 
            <br />
            and a few simple tips. In less than 20 minutes, you can prepare this
            <br />
            savoury custard loved by babies, kids and adults alike.

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
                ¼ tablespoon salt <br />
                4 eggs <br />
                400g water<br />
                ¼ tablespoon white pepper <br />
                1 tablespoon light soy sauce
              </p>
            </div>

            {/* Second Column - 1/2 width */}
            <div className="w-1/2 p-4">
              <p className="text-[#1D5198]">
                ½ tablespoon sesame oil <br />
                Pinch of Salt and Pepper
                <br />
                1 tbsp	water (for sauce) <br />
                1 cup	chopped spring onions <br />
                20g Butter <br />
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
                1. Prepare steamer. In a bowl, crack 4 eggs and mix it evenly with a pair of chopsticks. 
                <br />
                2. Add water (double the amount of egg), salt and white pepper into the beaten eggs and mix till it becomes homogenous.
                <br />
                3. Strain the mixture through a sieve into a deep plate or bowl. Discard the leftover egg mixture that didn't make it through the sieve.
                <br />
                4. Remove the bubbles on the surface of the egg mixture with a spoon.
                <br />
                5. Cover with aluminium foil and steam the egg mixture for 15 minutes in the pre-heated steamer at low to medium heat.
                <br />
                6. Meanwhile, combine light soy sauce, sesame oil and 1 tbsp water in a bowl. Once the steamed egg is ready, gently pour 
                the soy sauce mixture and garnish with the chopped spring onions before serving.
                <br />
                <br />
                <h3 className="text-xl text-[#1D5198] font-bold">Plating:</h3>
                <br />
                Remember, the key to a well-plated dish is balance and simplicity. Let the natural beauty of the steamed eggs shine through, and 
                use garnishes to enhance both the visual appeal and the flavor.
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
              <h3 className="text-xl text-[#1D5198] font-bold">Seasoning: </h3>
                  <p className="text-[#1D5198]">Experiment with seasonings to suit your taste. A pinch of salt, a dash of white pepper, and a splash of soy sauce can elevate the flavor. Consider adding a touch of sesame oil for depth.</p>
                  <h3 className="text-xl text-[#1D5198] font-bold"> Toppings and Garnishes: </h3>
                  <p className="text-[#1D5198]">Customize your steamed eggs with toppings like chopped green onions, cilantro, or a sprinkle of toasted sesame seeds. A drizzle of oyster sauce or a few drops of chili oil can add complexity.</p>
                  <h3 className="text-xl text-[#1D5198] font-bold">Water Ratio: </h3>
                  <p className="text-[#1D5198]">Control the water ratio in the steaming process. Too much water can lead to a wet surface on the steamed eggs. Aim for a gentle steam, and cover the dish with a lid or foil to prevent condensation.</p>
                  <h3 className="text-xl text-[#1D5198] font-bold">Steaming Time: </h3>
                  <p className="text-[#1D5198]">Steaming time is crucial. Oversteaming can result in a rubbery texture, while understeaming may leave the eggs watery. Aim for a custard-like consistency by checking doneness with a toothpick or fork.</p>

            
         
        </div>
        <div className="border-t border-gray-500 my-4 pl-20"></div>
        <div name="title" className="p-4 pl-20">
            <h2 className="text-3xl text-[#1D5198] font-bold">Nutritional Facts</h2>
          </div>
          <div name="content" className="p-4 pl-20">
  <ul className="list-disc text-[#1D5198] ml-4">
    <li><b>Calories</b>: Approximately 70-90 calories</li>
    <li><b>Protein</b>: 7-9 grams</li>
    <li><b>Fat</b>: 4-6 grams</li>
    <li><b>Carbohydrates</b>: 1-2 grams</li>
    <li><b>Cholesterol</b>: 180-200 milligrams</li>
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

export default steamedegg;
