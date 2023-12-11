import Link from 'next/link';
const Quizz = () => {
    return (
        <div className="h-screen bg-[#F9D548] text-[#0A2A67]">
            
            <div className="lg:w-4/5 lg:pr-8 p-8 flex flex-col items-center">
                <h2 className="text-6xl font-black py-5">Help us get to know you better!</h2>
            </div>
            <div className="lg:pr-8 p-8 grid grid-cols-3 gap-6 place-items-stretch">
           
                <div class="bg-white p-6 rounded shadow-md">
                    <h2 class="text-lg font-semibold mb-4">1. What dietary restrictions or preference do you have?</h2>

                    <div class="space-y-2">

                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Diet-free</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Vegan</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" /> 
                            <span class="text-sm">Gluten-free</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Other(please specify) </span>
                            <input type="text" class="border border-gray-300 p-1 pb-1 pr-8 rounded-md" />
                        </label>
                    </div>
                </div>

                <div class="bg-white p-6 rounded shadow-md">
                    <h2 class="text-lg font-semibold mb-4">2. What is your current weight?</h2>
                    <div class="space-y-2">
                    <label class="absolute bottom-[640px] left-[900px] items-center space-x-2">
                        <span class="text-sm">Weight: </span>
                        <input type="text" class="border border-gray-300 p-1 pb-1 pr-8 rounded-md" />
                        <span class="text-sm">kg</span>
                    </label>
                    </div>
                </div>

                <div class="bg-white p-6 rounded shadow-md">
                    <h2 class="text-lg font-semibold mb-4">3. What is your current height?</h2>
                    <div class="space-y-2">
                        <label class="absolute bottom-[640px] left-[1725px] items-center space-x-2">
                            <span class="text-sm">Height: </span>
                            <input type="text" class="border border-gray-300 p-1 pb-1 pr-8 rounded-md" />
                            <span class="text-sm">cm</span>
                        </label>
                    </div>
                </div>

                <div class="bg-white p-6 rounded shadow-md">
                    <h2 class="text-lg font-semibold mb-4">4. What foods do you think you might be allergic to?</h2>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Seafood (Shrimp, Crab, Lobster, etc.)</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Dairy products (Cheese, Milk, Yogurt, etc.)</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Nuts and seeds (Almonds, peanuts, Sunflower seeds, etc.)</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Other(please specify) </span>
                            <input type="text" class="border border-gray-300 p-1 pb-1 pr-8 rounded-md" />
                        </label>
                    </div>
                </div>

                <div class="bg-white p-6 rounded shadow-md">
                    <h2 class="text-lg font-semibold mb-4">5. How much time do you typically have to cook?</h2>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">15 minutes or less</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">20-30 minutes</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">45-60 minutes</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">More than an hour</span>
                        </label>
                    </div>
                </div>

                <div class="bg-white p-6 rounded shadow-md">
                    <h2 class="text-lg font-semibold mb-4">6. What is your primary health goal?</h2>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Weight Loss</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Improve my diet and nutrition</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Improve my overall health </span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Other(please specify) </span>
                            <input type="text" class="border border-gray-300 p-1 pb-1 pr-8 rounded-md" />
                        </label>
                    </div>
                </div>

                <div class="bg-white p-6 rounded shadow-md">
                    <h2 class="text-lg font-semibold mb-4">7. Are you following any specific diet plans or trends?</h2>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Ketogenic diet</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Vegetarian diet</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Intermittent fasting</span>
                        </label>


                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="form-checkbox" />
                            <span class="text-sm">Other(please specify) </span>
                            <input type="text" class="border border-gray-300 p-1 pb-1 pr-8 rounded-md" />
                        </label>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-6 right-20">
            <Link href="/termsCon">
            <button className="w-[350px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow">
              Next
            </button>
            </Link>
          </div>
        </div>
        );
    };
    
    export default Quizz;