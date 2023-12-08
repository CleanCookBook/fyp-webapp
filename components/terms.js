import { useState } from "react";

const terms = () => {

  const [isChecked, setIsChecked]=useState(false);
  
  const handleCheckChange=(event) => {
    setIsChecked(event.target.checked);
    if (!event.target.checked) {
      document.getElementById('required-error').classList.remove('hidden');
    } else {
      document.getElementById('required-error').classList.add('hidden');
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  const goToPrevPage = () => {
    if (currentPage) {
      setCurrentPage;
    }
  };

return (
  <div className="flex flex-col h-screen justify-center items-center bg-[#F9D548] text-[#0A2A67]">
    
    <div className="flex flex-col bg-[#F9D548] text-[#0A2A67] justify-center items-center">
        <button
            onClick={goToPrevPage}
            disabled={currentPage}
            className="text-2xl font-black font-semibold cursor-pointer hover:opacity-[0.5] absolute top-10 left-10"
        >
          {"< Back"}
        </button>
    </div>

      <div className="bg-white w-[1600px] h-[585px] mx-auto font-black text-2xl shadow-md flex-row -mt-9">
        <p className="text-xl font-bold flex py-5 px-5 top-0 left-75">Terms and Conditions </p>
        <div className="bg-[#E5E4E2] w-[1510px] h-[495px] font-black text-2xl shadow-md border-4 border-gray-300 overflow-auto justify-center items-center ml-10">
          <ol class="text-black text-base font-semibold pb-5 ajustify-center items-center">
            <li><b>Acceptance of Terms</b></li>
            <li>By accessing or using the CleanCookBook Healthy Recipe App ("the App"), you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please do not use the App.</li>
            <li><b>User Eligibility</b></li>
            <li>You must be at least 18 years old to use the App. By using the App, you warrant that you are at least 18 years old and have the legal capacity to enter into this agreement.</li>
            <li><b>User Accounts</b></li>
            <li>a. You may be required to create a user account to access certain features of the App. You are responsible for maintaining the confidentiality of your account information and are fully responsible for all activities that occur under your account.</li>
            <li>b. You agree to provide accurate and complete information when creating your account and to update your information promptly if there are any changes.</li>
            <li><b>User Content</b></li>
            <li>a. The App may allow users to submit, upload, or share content, including but not limited to recipes, images, and comments ("User Content"). You retain ownership of your User Content.</li>
            <li>b. By submitting User Content, you grant CleanCookBook a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display the User Content in connection with the App.</li>
            <li>c. You agree not to submit User Content that is unlawful, defamatory, obscene, offensive, or otherwise objectionable.</li>
            <li><b>Prohibited Conduct</b></li>
            <li>You agree not to:</li>
            <li>a. Use the App for any unlawful purpose or in violation of any applicable laws.</li>
            <li>b. Attempt to access, tamper with, or use non-public areas of the App, its systems, or its technical delivery systems.</li>
            <li>c. Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
            <li><b>Intellectual Property</b></li>
            <li>a. All content, features, and functionality of the App are owned by CleanCookBook and are protected by intellectual property laws.</li>
            <li>b. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, or transmit any of the material on the App without the prior written consent of CleanCookBook.</li>
            <li><b>Disclaimer of Warranties</b></li>
            <li>a. The App is provided "as is" and "as available" without any warranties of any kind, either express or implied.</li>
            <li>b. CleanCookBook does not warrant that the App will be uninterrupted or error-free, that defects will be corrected, or that the App is free of viruses or other harmful components.</li>
            <li><b>Limitation of Liability</b></li>
            <li>In no event shall CleanCookBook be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of the App.</li>
            <li><b>Changes to Terms</b></li>
            <li>CleanCookBook reserves the right to change or modify these terms at any time without notice. Your continued use of the App after such changes will indicate your acceptance of the updated terms.</li>
            <li><b>Contact Us</b></li>
            <li>If you have any questions about these Terms and Conditions, please contact us at cleancookbook@gmail.com.</li>
          </ol>

        </div>

        <div class="flex space-x-2 justify-center items-center cursor-pointer">
          <input 
            type="checkbox" 
            id="required-checkbox" 
            checked={isChecked}
            onChange={handleCheckChange}
            className="form-checkbox h-3 w-3 text-blue-600 mt-12 ml-2">
          </input>
          <label htmlFor="required-checkbox">
            <p class="text-gray-900 text-sm font-medium mt-12"> I accept the Terms & Conditions</p>
          </label>
          <span
            id="required-error"
            className={`text-sm text-red-500 absolute left-90 ${
            isChecked ? 'hidden' : ''
            }`}>
            <p className="flex flex-col">*Please check this box if you want to proceed.</p>
          </span>
        </div>

        <div class="flex justify-center items-center mt-3">
          <button type="button" class="w-[259px] h-[35px] bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] drop-shadow-xl">
            Create Account
          </button>
        </div>

      </div>


  </div>

);

};

export default terms;