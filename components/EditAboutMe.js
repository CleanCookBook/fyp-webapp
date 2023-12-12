import Image from "next/image";
import { useState } from "react";
import Footer from "./Footer";
import Modal from "./Modal"; // Adjust the path based on your file structure
import Navbar from "./Navbar";
import Link from 'next/link';

const EditAboutMe = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        dpreference : "",
        allergies : "",
        goals : "",
    })

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInput = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value
        setFormData((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue
      }));
    }

    const submitForm = (e) => {
        e.preventDefault()
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        })
        fetch(formURL, {
            method: "POST",
            body: data,
            headers: {
              'accept': 'application/json',
            },
        }).then((response) => response.json())
          .then((data) => {
            setFormData({
              dpreference : "",
              allergies : "",
              goals : "",
              height : "",
              weight : ""
            })
        })
    }

return (
<div className="flex flex-col h-screen bg-[#F9D548]">
    <Navbar />
    <div className=" lg:w-4/5 lg:pr-8 p-8 flex flex-col h-screen bg-[#F9D548] text-[#0A2A67] justify-start items-start">
    <div className="w-full max-w-md flex flex-row mt-7">
        <Image
            src="/logo.jpg"
            alt="Profile Picture"
            width={150}
            height={150}
            className="rounded-full shadow-lg"
        />
        <div className="flex flex-col mt-9 ml-8 gap-1">
          <h1 className="flex flex-row text-2xl font-bold text-black">Clean Cook Book</h1>
          <p className="text-xl text-black">@Cleancookbook</p>
        </div>
    </div>

    <form action="/update-account" method="POST" onSubmit={submitForm}>
        <div>
            <h2 className="text-xl underline font-bold left-10 mt-9">Dietary Settings</h2>
            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold mt-2">Dietary Preferences :</label>
                <select
                  className="text-xl text-black w-[400px] h-12 rounded-[10px] border p-2" 
                  type="text" 
                  name="dpreference" 
                  onChange={handleInput} 
                  value={formData.dpreference}>
                    <option value="">Select New Preference</option>
                    <option value="dairy-free">Dairy-free</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten-free</option>
                    <option value="halal">Halal</option>
                </select>
            </div>
            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold mt-2">Allergies :</label>
                <select
                  className="text-xl text-black w-[400px] h-12 rounded-[10px] border p-2" 
                  type="text" 
                  name="allergies" 
                  onChange={handleInput} 
                  value={formData.allergies}>
                    <option value="">Select New Allergies</option>
                    <option value="nuts">Nuts</option>
                    <option value="dairy">Dairy</option>
                    <option value="seafood">Seafood</option>
                    <option value="eggs">Eggs</option>
                    <option value="soy">Soy</option>
                </select>
            </div>
            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold mt-2">Health Goals :</label>
                <select
                  className="text-xl text-black w-[400px] h-12 rounded-[10px] border p-2" 
                  type="text" 
                  name="goals" 
                  onChange={handleInput} 
                  value={formData.goals}>
                    <option value="">Select New Goals</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="diet-nutrition"> Improve my diet and nutrition</option>
                    <option value="overall-health">Improve my overall health</option>
                </select>
            </div>
            <div className="flex flex-row mt-9 gap-4">
                <label className="text-xl text-black font-semibold mt-2">Height :</label>
                <input 
                  className="text-xl text-black w-[100px] h-12 rounded-[10px] border p-2" 
                  type="text" 
                  name="height" 
                  onChange={handleInput} 
                  value={formData.height} 
                  placeholder="Enter new height" />
                  <label className="text-xl text-black font-semibold mt-2">cm</label>
            </div>
            <div className="flex flex-row mt-9 gap-4">
                <label className="text-xl text-black font-semibold mt-2">Weight :</label>
                <input 
                  className="text-xl text-black w-[100px] h-12 rounded-[10px] border p-2" 
                  type="text" 
                  name="weight" 
                  onChange={handleInput} 
                  value={formData.weight} 
                  placeholder="Enter new weight" />
                  <label className="text-xl text-black font-semibold mt-2">kg</label> 
            </div>
            
            <div className="flex flex-row mt-20 gap-4">
            <Link href="/AboutMe">
              <button className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow">
              Confirm Update
              </button>
            </Link>
            </div>
        </div>
    </form>
        
    </div>
    <Footer />
        {isModalOpen && <Modal onClose={closeModal} />}
</div>
  );
};

export default EditAboutMe;