import Link from 'next/link';
const Signup = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[#F9D548] text-[#0A2A67]">
      <div className="lg:w-4/5 lg:pr-8 p-8 flex flex-col items-center">
        <h2 className="text-6xl font-black p-8">
          Take Your First Step To <br /> Better Eating{" "}
        </h2>

        <div className="flex lg:flex-row mx-12 items-center justify-center">
          <div classname="flex w-1/2">
            <div class="w-[400px] h-[60px] flex-col justify-start items-start inline-flex">
              <div class="justify-start items-start gap-2.5 inline-flex">
                <div class="text-blue-950 text-sm font-medium">
                  First Name :
                </div>
              </div>
              <div class="w-[404px] h-8 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <div class="justify-center items-start gap-2.5 flex">
                  <div class="text-neutral-400 text-[10px] font-medium">
                    Enter your First Name
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="w-[400px] h-[60px] flex-col justify-start items-start inline-flex">
              <div class="justify-start items-start gap-2.5 inline-flex">
                <div class="text-blue-950 text-sm font-medium">Last Name :</div>
              </div>
              <div class="w-[404px] h-8 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <div class="justify-center items-start gap-2.5 flex">
                  <div class="text-neutral-400 text-[10px] font-medium">
                    Enter your Last Name
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="w-[400px] h-[60px] flex-col justify-start items-start inline-flex">
              <div class="justify-start items-start gap-2.5 inline-flex">
                <div class="text-blue-950 text-sm font-medium">Username :</div>
              </div>
              <div class="w-[404px] h-8 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <div class="justify-center items-start gap-2.5 flex">
                  <div class="text-neutral-400 text-[10px] font-medium">
                    Enter your Username
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="w-[400px] h-[60px] flex-col justify-start items-start inline-flex">
              <div class="justify-start items-start gap-2.5 inline-flex">
                <div class="text-blue-950 text-sm font-medium">Password :</div>
              </div>
              <div class="w-[404px] h-8 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <div class="justify-center items-start gap-2.5 flex">
                  <div class="text-neutral-400 text-[10px] font-medium">
                    Enter your Password
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div>
            <Link href="/quizPage">
              <button class="w-[259px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow">
                Next
              </button>
              </Link>
            </div>
            <div className="text-sm mt-[1rem]">
              <p>
                Already have an account?{" "}
                <Link href="/loginPage">
                <span className="font-semibold underline hover:opacity-[0.5]">
                    Login here
                </span>
                </Link>
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <img
              className=" flex w-[400px] h-[400px] object-cover drop-shadow-lg ml-28"
              src="login-signupPage.jpg"
              alt="Sign Up Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
