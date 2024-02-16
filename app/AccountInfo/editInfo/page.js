"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Modal from "@/components/Modal"; // Adjust the path based on your file structure
import Navbar from "@/components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Select from "react-select";

const EditInfo = () => {
  const searchParams = useSearchParams();
  const userID = searchParams.get("UserID");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRole = 'system admin';
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState(
    []
  );
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedDietMethods, setSelectedDietMethods] = useState([]);
  const [selectedHealthGoals, setSelectedHealthGoals] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    DietaryPreferance: [],
    allergy: [],
    HealthGoal: [],
    height: "",
    Weight: "",
    BMI: "",
    DietMethod: [], // Corrected the variable name
  });

  const selectOptions = {
    DietaryPreferanceOptions: [
      { value: "Dairy-free", label: "Dairy-free" },
      { value: "Vegan", label: "Vegan" },
      { value: "Gluten-free", label: "Gluten-free" },
      { value: "Halal", label: "Halal" },
      { value: "Nil", label: "Nil" },
    ],
    allergyOptions: [
      { value: "Seafood", label: "Seafood" },
      { value: "Dairy", label: "Dairy" },
      { value: "Nuts", label: "Nuts" },
      { value: "Eggs", label: "Eggs" },
      { value: "Nil", label: "Nil" },
    ],
    DietMethodOptions: [
      { value: "Ketogenic diet", label: "Ketogenic diet" },
      { value: "Vegetarian diet", label: "Vegetarian diet" },
      { value: "Intermittent Fasting", label: "Intermittent Fasting" },
      { value: "Mediterranean Diet", label: "Mediterranean Diet" },
      { value: "Nil", label: "Nil" },
    ],
    HealthGoalOptions: [
      { value: "Weight Loss", label: "Weight Loss" },
      {
        value: "Improve my diet and nutrition",
        label: "Improve my diet and nutrition",
      },
      {
        value: "Improve my overall health",
        label: "Improve my overall health",
      },
      {
        value: "Adequate Nutrients Within Calorie Needs",
        label: "Adequate Nutrients Within Calorie Needs",
      },
      { value: "Nil", label: "Nil" },
    ],
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionsChange = (type, options) => {
    switch (type) {
      case "DietaryPreferences":
        setSelectedDietaryPreferences(options);
        break;
      case "Allergies":
        setSelectedAllergies(options);
        break;
      case "DietMethods":
        setSelectedDietMethods(options);
        break;
      case "HealthGoals":
        setSelectedHealthGoals(options);
        break;
      default:
        console.log("Invalid type");
    }
  };

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Get the values from the selected options
    const dietaryPreferences =
      selectedDietaryPreferences.length > 0
        ? selectedDietaryPreferences.map((option) => option.value).join(", ")
        : formData.DietaryPreferance;
    const allergies =
      selectedAllergies.length > 0
        ? selectedAllergies.map((option) => option.value).join(", ")
        : formData.allergy;
    const dietMethods =
      selectedDietMethods.length > 0
        ? selectedDietMethods.map((option) => option.value).join(", ")
        : formData.DietMethod;
    const healthGoals =
      selectedHealthGoals.length > 0
        ? selectedHealthGoals.map((option) => option.value).join(", ")
        : formData.HealthGoal;

    // Merge them with the rest of the form data
    const finalFormData = {
      ...formData,
      DietaryPreferance: dietaryPreferences,
      allergy: allergies,
      DietMethod: dietMethods,
      HealthGoal: healthGoals,
      BMI,
    };

    try {
      const response = await fetch(
        `https://ccb-backendd.onrender.com/api/edit/update-AboutMe/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(finalFormData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        console.log("About Me updated successfully");
        router.push("/home/SysAdminHome");
      } else {
        console.log("Failed to update About Me");
      }
    } catch (error) {
      console.log("Error updating About Me: " + error.message);
    }
  };

  const [BMI, setBMI] = useState(0); // Add this state variable for BMI
  // This effect will run every time `formData.height` or `formData.Weight` changes
  useEffect(() => {
    if (formData.height && formData.Weight) {
      const heightInMeters = formData.height / 100;
      const newBMI = formData.Weight / (heightInMeters * heightInMeters);
      setBMI(newBMI.toFixed(1));
    }
  }, [formData.height, formData.Weight]);

 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://ccb-backendd.onrender.com/api/edit/userInfo/${userID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFormData({
          DietaryPreferance: data.DietaryPreferance ? JSON.parse(data.DietaryPreferance) : [],
          allergy: data.allergy ? JSON.parse(data.allergy) : [],
          DietMethod: data.DietMethod ? JSON.parse(data.DietMethod) : [],
          HealthGoal: data.HealthGoal ? JSON.parse(data.HealthGoal) : [],
          height: data.height,
          Weight: data.Weight,
          BMI: data.BMI,
        });
      } catch (error) {
        console.error("Error during About Me fetch:", error.message);
      }
    };
    fetchUserData();
  }, [userID])

  return (
    <Suspense fallback={<LoadingSpinner />}>
    <div className="flex flex-col h-full bg-[#F9D548]">
      <Navbar userRole={userRole} />
      <div className="lg:w-4/5 lg:pr-8 p-8 flex flex-col h-full bg-[#F9D548] text-[#0A2A67] justify-start items-start ml-20">
        <form action="/update-account" method="POST" onSubmit={submitForm}>
          <div>
            <h2 className="text-xl underline font-bold left-10 mt-9">
              Dietary Settings
            </h2>
            <div className="flex flex-row mt-9 gap-4">
              <label className="flex flex-row text-xl text-black font-semibold mt-2">
                Dietary Preference :
              </label>
              <Select
                isMulti
                name="DietaryPreferance"
                options={selectOptions.DietaryPreferanceOptions}
                classNamePrefix="select"
                onChange={(options) =>
                  handleOptionsChange("DietaryPreferences", options)
                }
                placeholder="Select New Dietary Preferences"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "10px", // This makes the box rounded
                    borderColor: "#D1D5DB", // This is equivalent to border-gray-300 in Tailwind
                    boxShadow: "none", // Removes the default react-select styles
                    height: "50px", // Adjust the height here
                    width: "556px", // Adjust the width here
                    fontSize: "20px", // Adjust the font size here
                    "&:hover": {
                      borderColor: "#9CA3AF", // This is equivalent to border-gray-400 in Tailwind on hover
                    },
                  }),
                }}
              />
            </div>

            <div className="flex flex-row mt-9 gap-4">
              <label className="flex flex-row text-xl text-black font-semibold mt-2">
                Allergies :
              </label>
              <Select
                isMulti
                name="allergy"
                options={selectOptions.allergyOptions}
                classNamePrefix="select"
                onChange={(options) =>
                  handleOptionsChange("Allergies", options)
                }
                placeholder="Select New Allergies"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "10px", // This makes the box rounded
                    borderColor: "#D1D5DB", // This is equivalent to border-gray-300 in Tailwind
                    boxShadow: "none", // Removes the default react-select styles
                    height: "50px", // Adjust the height here
                    width: "660px", // Adjust the width here
                    fontSize: "20px", // Adjust the font size here
                    "&:hover": {
                      borderColor: "#9CA3AF", // This is equivalent to border-gray-400 in Tailwind on hover
                    },
                  }),
                }}
              />
            </div>

            <div className="flex flex-row mt-9 gap-4">
              <label className="flex flex-row text-xl text-black font-semibold mt-2">
                Diet Method :
              </label>
              <Select
                isMulti
                name="DietMethod"
                options={selectOptions.DietMethodOptions}
                classNamePrefix="select"
                onChange={(options) =>
                  handleOptionsChange("DietMethods", options)
                }
                placeholder="Select New Diet Method"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "10px", // This makes the box rounded
                    borderColor: "#D1D5DB", // This is equivalent to border-gray-300 in Tailwind
                    boxShadow: "none", // Removes the default react-select styles
                    height: `${selectedDietMethods.length * 10 + 50}px`, // Adjust the height here
                    width: "619px", // Adjust the width here
                    fontSize: "20px", // Adjust the font size here
                    "&:hover": {
                      borderColor: "#9CA3AF", // This is equivalent to border-gray-400 in Tailwind on hover
                    },
                  }),
                }}
              />
            </div>

            <div className="flex flex-row mt-9 gap-4">
              <label className="flex flex-row text-xl text-black font-semibold mt-2">
                Health Goals :
              </label>
              <Select
                isMulti
                name="HealthGoal"
                options={selectOptions.HealthGoalOptions}
                classNamePrefix="select"
                onChange={(options) =>
                  handleOptionsChange("HealthGoals", options)
                }
                placeholder="Select New Health Goals"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "10px", // This makes the box rounded
                    borderColor: "#D1D5DB", // This is equivalent to border-gray-300 in Tailwind
                    boxShadow: "none", // Removes the default react-select styles
                    height: `${selectedHealthGoals.length * 20 + 50}px`, // Adjust the height here
                    width: "617px", // Adjust the width here
                    fontSize: "20px", // Adjust the font size here
                    "&:hover": {
                      borderColor: "#9CA3AF", // This is equivalent to border-gray-400 in Tailwind on hover
                    },
                  }),
                }}
              />
            </div>

            <div className="flex flex-row mt-9 gap-4">
              <label className="text-xl text-black font-semibold mt-2">
                Height :
              </label>
              <input
                className="text-xl text-black w-[500px] h-12 rounded-[10px] border p-2"
                type="number"
                name="height"
                onChange={handleInput}
                value={formData.height}
                placeholder="Enter new height"
              />
              <label className="text-xl text-black font-semibold mt-2">
                cm
              </label>
            </div>

            <div className="flex flex-row mt-9 gap-4">
              <label className="text-xl text-black font-semibold mt-2">
                Weight :
              </label>
              <input
                className="text-xl text-black w-[490px] h-12 rounded-[10px] border p-2"
                type="number"
                name="Weight"
                onChange={handleInput}
                value={formData.Weight}
                placeholder="Enter new weight"
              />
              <label className="text-xl text-black font-semibold mt-2">
                kg
              </label>
            </div>

            <div className="flex flex-row mt-9 gap-4">
              <label className="text-xl text-black font-semibold mt-2">
                BMI :
              </label>
              <input
                className="text-xl text-black w-[490px] h-12 rounded-[10px] -mt-0.5 p-2 bg-[#F9D548]"
                type="number"
                name="BMI"
                value={BMI}
                placeholder="Your BMI"
                readOnly
              />
            </div>

            <div className="flex flex-row mt-16 gap-4">
              <button
                type="submit"
                onClick={submitForm}
                className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow"
              >
                {submitting ? "Updating..." : "Confirm Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
    </Suspense>
  );
};

export default EditInfo;
