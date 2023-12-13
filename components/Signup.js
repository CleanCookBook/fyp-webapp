import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Signup = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 const handleNext = async () => {
    const userData = {
      firstName,
      lastName,
      email,
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // The server accepted the data, navigate to the next page (e.g., quizPage)
        const responseData = await response.json();
        console.log('Server response:', responseData);
        router.push('/quizPage');
      } else {
        // Handle error scenarios, e.g., display an error message to the user
        console.error('Error submitting signup data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting signup data:', error.message);
    }
  };

  
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
                <div className="w-[404px] h-8 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="text-neutral-400 text-[10px] font-medium border-none outline-none w-full"
                />
              </div>
            </div>
              <br />
              <div class="w-[400px] h-[60px] flex-col justify-start items-start inline-flex">
                <div class="justify-start items-start gap-2.5 inline-flex">
                  <div class="text-blue-950 text-sm font-medium">Last Name :</div>
                </div>
                <div className="w-[404px] h-8 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="text-neutral-400 text-[10px] font-medium border-none outline-none w-full"
                />
              </div>
            </div>
              <br />
              <div class="w-[400px] h-[60px] flex-col justify-start items-start inline-flex">
                <div class="justify-start items-start gap-2.5 inline-flex">
                  <div class="text-blue-950 text-sm font-medium">Email :</div>
                </div>
                <div className="w-[404px] h-8 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-neutral-400 text-[10px] font-medium border-none outline-none w-full"
                />
              </div>
            </div>
              <br />
              <div class="w-[400px] h-[60px] flex-col justify-start items-start inline-flex">
                <div class="justify-start items-start gap-2.5 inline-flex">
                  <div class="text-blue-950 text-sm font-medium">Username :</div>
                </div>
                <div className="w-[404px] h-8 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-neutral-400 text-[10px] font-medium border-none outline-none w-full"
                />
              </div>
            </div>
              <br />
              <div class="w-[400px] h-[60px] flex-col justify-start items-start inline-flex">
                <div class="justify-start items-start gap-2.5 inline-flex">
                  <div class="text-blue-950 text-sm font-medium">Password :</div>
                </div>
                <div className="w-[404px] h-8 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-neutral-400 text-[10px] font-medium border-none outline-none w-full"
                />
              </div>
            </div>
              <br />
              <div>
        <button onClick={handleNext} className="w-[259px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow">
          Next
        </button>
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
