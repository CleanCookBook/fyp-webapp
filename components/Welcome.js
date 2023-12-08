import Link from 'next/link';
const Welcome = () => {
 
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[#F9D548] text-[#0A2A67]">
      <div>
        <h2 className="text-4xl font-semibold">Hello! Welcome To</h2>
      </div>
      <div>
        <h1 className="text-6xl font-black">CleanCookBook</h1>
      </div>

      <div>
        <Link href="/loginPage">
          <button className="w-[110px] h-[44px] bg-[#154083] hover:bg-[#1c57b1] text-white font-bold rounded-[15px] mt-[2rem] drop-shadow-xl">
            Login
          </button>
        </Link>
      </div>

      <div className="text-sm mt-[1rem]">
        <p>
          Do not have an account?{" "}
          <span className="font-semibold underline hover:opacity-[0.5]">
            <Link href="/signUp">
              Sign Up here
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Welcome;
