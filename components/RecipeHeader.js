// RecipeHeader.js
import Image from 'next/image';


const RecipeHeader = () => {
  return (
    <div className="p-4 pl-20 bg-[#F9D548]">
      <h1 className="text-6xl font-extrabold text-blue-950">
        Homemade Fish & Chips
      </h1>

      <div className="flex p-4 pl-20 bg-[#F9D548]">
        {/* Division 1 - 1/3 width */}
        <div className="w-1/3">
          <Image
            src="/Fish&chips.jpg" // Replace with the actual path to your image
            alt="Homemade Fish & Chips Image"
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
            Read the{' '}
            <a href="/reviews" style={{ textDecoration: "underline" }}>
              reviews
            </a>
          </p>

          <h2 className="text-3xl text-[#1D5198] font-bold">Why this Recipe?</h2>
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
    </div>
  );
};

export default RecipeHeader;
