const terms = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[#F9D548] text-[#0A2A67]">
      <div className="lg:w-4/5 lg:pr-8 p-8 flex flex-col items-center">
        <div className="text-2xl text-blue-900 font-semibold w-[1800px] h-[760px]">
          <span className="font-semibold no-underline hover:opacity-[0.5]">
            Back
          </span>
        </div>

        <div className="bg-white w-[1600px] h-[560px] absolute top-[95px] left-15 font-black text-2xl px-7 shadow-md">
          <span className="text-xl font-bold absolute top-[15px]">
            Terms and Conditions{" "}
          </span>
          <ol class="text-black text-base font-semibold pb-5 absolute top-[55px]">
            <li>
              <b>Eligibility:</b> To use this website, you must be at least 18
              years old and have the capacity to enter into a binding agreement.
              If you are under 18, you may only use this website with the
              involvement of a parent or legal guardian who agrees to be bound
              by these Terms and Conditions.
            </li>
            <li>
              **Access and Use:** We grant you a non-exclusive,
              non-transferable, revocable license to access and use the website
              for your personal, non-commercial use only. You agree not to use
              the website for any other purpose, including any commercial
              purpose, without our express written consent.
            </li>
            <li>
              **User Content:** You are solely responsible for any content you
              submit, post, or upload to the website. You represent and warrant
              that you own all rights to your User Content or have obtained all
              necessary permissions and licenses to use and authorize us to use
              it. You further agree that your User Content will not:
            </li>
            <li>
              Be defamatory, libelous, invasive of privacy, obscene, hateful, or
              racially, ethnically, or otherwise objectionable.
            </li>
            <li>
              Infringe any patent, trademark, copyright, or other intellectual
              property right of any other person.
            </li>
            <li>Contain any viruses, malware, or other harmful code.</li>
            <li>Be false, misleading, or inaccurate.</li>
            <li>
              **Intellectual Property:** The content and materials on the
              website, including, but not limited to, text, graphics, logos,
              images, and software, are protected by copyright, trademark, and
              other intellectual property laws. You agree not to reproduce,
              distribute, modify, create derivative works, publicly display, or
              commercially exploit any of the content or materials on the
              website without our express written consent.
            </li>
            <li>
              **Disclaimer:** The information on the website is provided for
              informational purposes only and is not intended to be a substitute
              for professional medical advice. You should always consult with a
              qualified healthcare professional before making any changes to
              your diet or exercise routine.
            </li>
            <li>
              **Termination:** We may terminate your access to the website at
              any time, for any reason, without notice.
            </li>
            <li>
              **Entire Agreement:** These Terms and Conditions constitute the
              entire agreement between you and us regarding your use of the
              website.
            </li>
            <li>
              **Amendments:** We may amend these Terms and Conditions at any
              time by posting the amended terms on the website. Your continued
              use of the website after the posting of the amended terms
              constitutes your acceptance of the amendments.
            </li>
            <li>
              **Contact Us:** If you have any questions about these Terms and
              Conditions, please contact us at cleancookbook@gmail.com.
            </li>
          </ol>
        </div>

        <div class="flex items-center space-x-3 absolute bottom-[145px] left-15">
          <input
            type="checkbox"
            class="form-checkbox h-3 w-3 text-blue-600"
          ></input>
          <span class="text-gray-900 font-medium">
            I accept the Terms & Conditions
          </span>
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
