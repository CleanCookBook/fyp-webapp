const Login = () => {
    return (
        <div className="flex flex-col h-screen justify-center items-center bg-[#F9D548] text-[#0A2A67]">
            <div className="lg:w-1/2 lg:pr-8 ">
                <h2 className="text-6xl font-black py-5">Welcome Back!</h2>

                 <div class="w-[800px] h-[250px] flex-col justify-start items-start inline-flex">
                        <div class="justify-start items-start gap-2.5 inline-flex">
                            <div class="text-blue-950 text-sm font-medium">Username :</div>
                        </div>
                        <div class="w-[404px] h-8 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                            <div class="justify-center items-start gap-2.5 flex">
                                <div class="text-neutral-400 text-[10px] font-medium">Enter your Username</div>
                            </div>
                        </div>
                    
                    <br/>
            
                        <div class="justify-start items-start gap-2.5 inline-flex">
                            <div class="text-blue-950 text-sm font-medium">Password :</div>
                        </div>
                        <div class="w-[404px] h-8 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                            <div class="justify-center items-start gap-2.5 flex">
                                <div class="text-neutral-400 text-[10px] font-medium">Enter your Password</div>
                            </div>
                        </div>
                    
                    <div className="pt-3">
                        <button class="w-[170px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold text-sm rounded-[10px] shadow">
                            Login Now
                        </button>
                    </div>
                    <div className="text-sm mt-[1rem]">
                        <p>
                            Do not have an account?{" "}
                            <span className="font-semibold underline hover:opacity-[0.5]">
                                Sign Up here
                            </span>
                        </p>
                    </div>
                    </div>
                    <div className="flex-row justify-normal items-start inline-flex">
                        <img className="w-[400px] h-[400px] flex-row drop-shadow-lg" src="login-signupPage.jpg" alt="Login Image" />
                    </div>
        </div>
        </div>
        

    );
};
    
    

export default Login;
