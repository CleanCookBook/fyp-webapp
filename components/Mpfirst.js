import Link from 'next/link';
import Navbar from "./Navbar";
import Footer from "./Footer";

const mpfirst = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
            <Navbar />
            <div className="flex flex-col justify-center items-center mt-20">
            <div className="grid grid-cols-3 gap-20 place-items-center">
                <Link href="/NewsFeed">
                    <div className="relative hover:brightness-75 transition-all">
                        <img
                        src="./high protein meal.jpg" 
                        alt="High protein diet food" 
                        width ={380}
                        height={380}
                        className="object-cover rounded-[20px] shadow-2xl shadow-black filter brightness-75"
                        />
                        <div className="absolute top-0 left-0 right-0 p-4 text-white text-start font-bold text-4xl">
                        HIGH <br /> PROTEIN <br /> DIET
                        </div>
                    </div>
                </Link>
                

                <Link href="/NewsFeed">
                    <div className="relative hover:brightness-75 transition-all">
                        <img
                        src="./low carbs diet.jpg" 
                        alt="low carbs diet food" 
                        width={350}
                        height={350}
                        className="object-cover rounded-[20px] shadow-2xl shadow-black filter brightness-75"
                        />
                        <div className="absolute top-0 left-0 right-0 p-4 text-white text-start font-bold text-4xl">
                        LOW <br /> CARBS <br /> DIET
                        </div>
                    </div>
                </Link> 

                <Link href="/NewsFeed">
                    <div className="relative hover:brightness-75 transition-all">
                        <img
                        src="./paleo meal.jpg" 
                        alt="paleo diet food" 
                        width={350}
                        height={350}
                        className="object-cover rounded-[20px] shadow-2xl shadow-black filter brightness-75"
                        />
                        <div className="absolute top-0 left-0 right-0 p-4 text-white text-start font-bold text-4xl">
                        PALEO <br />  Diet
                        </div>
                    </div>
                </Link>
                <Link href="/NewsFeed">
                    <div className="relative hover:brightness-75 transition-all">
                        <img
                        src="./vegan diet.jpg" 
                        alt="vegan diet food" 
                        width ={380}
                        height={380}
                        className="object-cover rounded-[20px] shadow-2xl shadow-black filter brightness-75"
                        />
                        <div className="absolute top-0 left-0 right-0 p-4 text-white text-start font-bold text-4xl">
                        VEGAN <br /> DIET
                        </div>
                    </div>
                </Link> 
                <Link href="/NewsFeed">
                    <div className="relative hover:brightness-75 transition-all">
                        <img
                        src="./atkins diet.jpg" 
                        alt="atkins diet food" 
                        width ={360}
                        height={360}
                        className="object-cover rounded-[20px] shadow-2xl shadow-black filter brightness-75"
                        />
                        <div className="absolute top-0 left-0 right-0 p-4 text-white text-start font-bold text-4xl">
                        ATKINS <br /> DIET
                        </div>
                    </div>
                </Link> 
                <Link href="/NewsFeed">
                    <div className="relative hover:brightness-75 transition-all">
                        <img
                        src="./ultra low fat.jpg" 
                        alt="ultra low fat diet food" 
                        width ={380}
                        height={380}
                        className="object-cover rounded-[20px] shadow-2xl shadow-black filter brightness-75"
                        />
                        <div className="absolute top-0 left-0 right-0 p-4 text-white text-start font-bold text-4xl">
                        ULTRA <br /> LOW FAT <br /> Diet
                        </div>
                    </div>
                </Link> 
            </div>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
        );
    };
    
    export default mpfirst;