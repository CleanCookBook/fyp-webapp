import Image from "next/image";
import { useState } from "react";
import Footer from "./Footer";
import Modal from "./Modal"; // Adjust the path based on your file structure
import Navbar from "./Navbar";

const Accountpage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name : "",
        dob : "",
        gender : "",
        email : "",
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
                name : "",
                dob : "",
                gender : "",
                email : ""
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

    <from method="POST" onSubmit={submitForm}>
        <div>
            <h2 className="text-xl underline font-bold left-10 mt-9">General Settings</h2>
            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold">Name :</label>
                <input className="text-xl text-black" type="text" name="name" onChange={handleInput} value={formData.name} />
            </div>
            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold">Date of Birth :</label>
                <input className="text-xl text-black" type="text" name="dob" onChange={handleInput} value={formData.dob} />
            </div>
            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold">Gender :</label>
                <input className="text-xl text-black" type="text" name="gender" onChange={handleInput} value={formData.gender} />
            </div>
            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold">E-mail :</label>
                <input className="text-xl text-black" type="text" name="email" onChange={handleInput} value={formData.email} />
            </div>
            <div className="flex flex-row mt-28 gap-4">
                <button className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow">
                    <a href="#">Edit</a>
                </button>

                <button className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow">
                    <a href="#">Reset Password</a>
                </button>

                <button type="submit">
                    submit
                </button>
            </div>
        </div>
    </from>
        
    </div>
    <Footer />
        {isModalOpen && <Modal onClose={closeModal} />}
</div>
  );
};

export default Accountpage;
