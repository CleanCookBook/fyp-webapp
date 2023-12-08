import Link from 'next/link';
const Login = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[#F9D548] text-[#0A2A67]">
      <div className="lg:w-4/5 lg:pr-8 p-8 flex flex-col items-center">
        <h2 className="text-6xl font-black py-5">Welcome Back!</h2>

        <div className="w-[800px] h-[250px] flex-col justify-start items-start inline-flex">
          <div className="justify-start items-start gap-2.5 inline-flex">
            <div className="text-blue-950 text-sm font-medium">Username :</div>
          </div>
          <div className="w-[404px] h-8 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
            <div className="justify-center items-start gap-2.5 flex">
              <div className="text-neutral-400 text-[10px] font-medium">
                Enter your Username
              </div>
            </div>
          </div>

          <br />

          <div className="justify-start items-start gap-2.5 inline-flex">
            <div className="text-blue-950 text-sm font-medium">Password :</div>
          </div>
          <div className="w-[404px] h-8 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
            <div className="justify-center items-start gap-2.5 flex">
              <div className="text-neutral-400 text-[10px] font-medium">
                Enter your Password
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button className="w-[170px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold text-sm rounded-[10px] shadow">
              Login     
            </button>
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
        <div className="flex-row justify-normal items-start inline-flex">
          <img
            className="flex w-[400px] h-[400px] object-cover drop-shadow-lg ml-28"
            src="login-signupPage.jpg"
            alt="Sign Up Image"
          />
        </div>
        <div className="pt-3">
        {/* Use the Link component to create a navigation link */}
        <Link href="/home">
          <button className="w-[110px] h-[44px] bg-[#154083] hover:bg-[#1c57b1] text-white font-bold rounded-[15px] mt-[2rem] drop-shadow-xl">
            next
          </button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Login;
