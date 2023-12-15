import Navbar from "./Navbar";
import Footer from "./Footer";
import Link from 'next/link';

const LowCarbsMealPlan1 = () => {
  return (
    <section className="flex flex-col h-screen bg-[#F9D548]">
      <Navbar />

      <div className="flex-grow w-[1108px] mx-auto mt-8">
        <Link href="/mpfirst">
          <button className="flex justify-center items-center w-[94px] h-[38px] bg-blue-950 rounded-[10px] shadow mb-9">
            <div className="text-white font-medium focus:outline-none">
              &lt; Back
            </div>
          </button>
        </Link>
        <h1 className="text-blue-950 text-5xl font-extrabold text-left mb-8 pl-8">
          Low Carbs Diet{" "}
        </h1>
        <div className="text-blue-950 text-base text-center font-medium">
          Embracing a low-carb diet involves reducing the intake of
          carbohydrates while focusing on wholesome, nutrient-dense foods. This
          dietary approach limits foods high in sugars and starches, opting
          instead for options rich in proteins, healthy fats, and fibre.
          <br />
          <br />A low-carb meal plan typically emphasizes fresh vegetables, lean
          proteins like chicken, fish, and tofu, and healthy fats from sources
          such as avocados, nuts, and olive oil. By cutting back on refined
          grains, sugary foods, and processed items, this diet encourages stable
          blood sugar levels and can aid in weight management.
          <br />
          <br />
          Incorporating diverse, flavourful ingredients, our low-carb meal plans
          offer a range of delicious options, from vibrant salads bursting with
          fresh produce to savoury dishes showcasing the versatility of proteins
          and healthy fats. These recipes aim to inspire a healthier lifestyle
          while catering to varied tastes and preferences.
          <br />
          <br />
          Whether you're seeking to explore new culinary avenues or aiming for a
          balanced, low-carb approach, our meal plans provide a roadmap to
          delicious and satisfying dishes that align with your dietary goals.
        </div>
        <div className="flex justify-center mt-11">
          <Link href="/LowCarbMealPlan3">
            <button className="w-[234px] h-[46px] bg-blue-950 rounded-[10px] shadow flex items-center justify-center">
              <div className="text-white font-medium focus:outline-none">
                Start Your Meal Plan Now
              </div>
            </button>
          </Link>
        </div>
      </div>
      <Footer className="mt-auto" />
    </section>
  );
};

export default LowCarbsMealPlan1;
