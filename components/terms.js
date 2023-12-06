const terms = () => {
return (
  <div className="flex flex-col h-screen justify-center items-center bg-[#F9D548] text-[#0A2A67]">
      <div className="lg:w-4/5 lg:pr-8 p-8 flex flex-col items-center">
   
        <div className="text-2xl font-black font-semibold w-[1800px] h-[760px]">
          <span className="font-semibold cursor-pointer no-underline hover:opacity-[0.5]">
            Back
          </span>
        </div>

      <div className="bg-white w-[1600px] h-[565px] absolute top-[95px] left-15 font-black text-2xl px-7 shadow-md">
        <span className="text-xl font-bold absolute top-[15px]">Terms and Conditions </span>
        <div className="bg-[#E5E4E2] border-4 border-gray-300 w-[1510px] overflow-auto h-[495px] absolute top-[55px] left-[45px] font-black text-2xl px-7 shadow-md">
          <ol class="text-black text-base font-semibold pb-5 absolute top-[5px]">
            <li><b>1. Acceptance of Terms</b></li>
            <li>By accessing or using the CleanCookBook Healthy Recipe App ("the App"), you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please do not use the App.</li>
            <li><b>2. User Eligibility</b></li>
            <li>You must be at least 18 years old to use the App. By using the App, you warrant that you are at least 18 years old and have the legal capacity to enter into this agreement.</li>
            <li><b>3. User Accounts</b></li>
            <li>a. You may be required to create a user account to access certain features of the App. You are responsible for maintaining the confidentiality of your account information and are fully responsible for all activities that occur under your account.</li>
            <li>b. You agree to provide accurate and complete information when creating your account and to update your information promptly if there are any changes.</li>
            <li><b>4. User Content</b></li>
            <li>a. The App may allow users to submit, upload, or share content, including but not limited to recipes, images, and comments ("User Content"). You retain ownership of your User Content.</li>
            <li>b. By submitting User Content, you grant CleanCookBook a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display the User Content in connection with the App.</li>
            <li>c. You agree not to submit User Content that is unlawful, defamatory, obscene, offensive, or otherwise objectionable.</li>
            <li><b>5. Prohibited Conduct</b></li>
            <li>You agree not to:</li>
            <li>a. Use the App for any unlawful purpose or in violation of any applicable laws.</li>
            <li>b. Attempt to access, tamper with, or use non-public areas of the App, its systems, or its technical delivery systems.</li>
            <li>c. Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
            <li><b>6. Intellectual Property</b></li>
            <li>a. All content, features, and functionality of the App are owned by CleanCookBook and are protected by intellectual property laws.</li>
            <li>b. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, or transmit any of the material on the App without the prior written consent of CleanCookBook.</li>
            <li><b>7. Disclaimer of Warranties</b></li>
            <li>a. The App is provided "as is" and "as available" without any warranties of any kind, either express or implied.</li>
            <li>b. CleanCookBook does not warrant that the App will be uninterrupted or error-free, that defects will be corrected, or that the App is free of viruses or other harmful components.</li>
            <li><b>8. Limitation of Liability</b></li>
            <li>In no event shall CleanCookBook be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of the App.</li>
            <li><b>9. Changes to Terms</b></li>
            <li>CleanCookBook reserves the right to change or modify these terms at any time without notice. Your continued use of the App after such changes will indicate your acceptance of the updated terms.</li>
            <li><b>10. Contact Us</b></li>
            <li>If you have any questions about these Terms and Conditions, please contact us at cleancookbook@gmail.com.</li>
          </ol>
          </div>
      </div>

      <div class="flex items-center space-x-3 absolute bottom-[145px] left-15">
      <input type="checkbox" class="form-checkbox h-3 w-3 text-blue-600"></input>
        <span class="text-gray-900 font-medium">I accept the Terms & Conditions</span>
      </div>

      <div>
        <button class="w-[259px] h-8 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow absolute bottom-[105px] left-[850px]">
          Create Account
        </button>
      </div>
</div>
</div>


);
};
  
export default terms;
  