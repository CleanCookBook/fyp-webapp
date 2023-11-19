import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className=" flex bg-blue-950 h-[80px] items-center">
            <div className='text-white flex w-1/2 justify-start font-black text-2xl px-10'>
                <p>Logo Image Here</p>
            </div>
            <div className="container mx-auto">
                
                <ul>
                    <li className='text-white font-bold flex justify-end'> 
                        <a className=' px-4'>Recipes</a>
                        <a className=' px-4'>About Us</a>
                        <a className=' px-4'>Meal Plans</a>
                        <a className=' pr-10 pl-4'>Account</a>
                    </li>
                </ul>

            </div>
        </nav>
    );
}

export default Navbar;