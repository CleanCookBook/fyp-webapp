"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";

const LivechatwithBot = () => {
  const userRole = 'user';
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSatisfied, setIsSatisfied] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const mealplanInfo = [
    
    {
      question: 'What is a meal planning website?',
      answer: 'A meal planning website is an online platform designed to assist users in organizing and managing their meals. It typically offers features such as customizable meal plans, recipes, grocery lists, nutritional information, and sometimes even delivery services.'
    },
    {
      question: 'How does a meal planning website work?',
      answer: 'Users typically start by setting their dietary preferences, health goals, and any food restrictions they may have. Based on this information, the website generates personalized meal plans with recipes and corresponding grocery lists. Users can then customize their plans further if desired.'
    },
    {
      question: 'What are the benefits of using a meal planning website?',
      answer: 'Meal planning websites offer several benefits, including saving time by eliminating the need to brainstorm meal ideas and create shopping lists manually. They also help users eat healthier by providing nutritious recipes tailored to their dietary needs and goals. Additionally, they can help reduce food waste by encouraging more efficient grocery shopping.'
    },
    {
      question: 'Are the recipes on meal planning websites easy to follow?',
      answer: 'Yes, most meal planning websites curate recipes that are user-friendly and include step-by-step instructions, ingredient lists, and sometimes even instructional videos. Whether youre a beginner or an experienced cook, you should find the recipes easy to follow.'
    },
    {
      question: 'Do meal planning websites offer support for special diets, such as keto or paleo?',
      answer: 'Yes, many meal planning websites cater to various dietary lifestyles, including keto, paleo, vegan, vegetarian, gluten-free, and more. You can usually select your preferred diet type when setting up your profile or preferences.'
    }
  ];

  const recipeInfo = [
    
    {
      question: 'Are the recipes on the healthy recipe website suitable for specific dietary needs?',
      answer: 'Yes, the recipes on our website cater to various dietary preferences and requirements, including vegetarian, vegan, gluten-free, dairy-free, low-carb, and more. Each recipe typically includes information about its suitability for different dietary needs.'
    },
    {
      question: 'How do you define "healthy" in the context of your recipes?',
      answer: 'We define "healthy" recipes as those that prioritize nutritious ingredients, balance essential nutrients, and promote overall well-being. Our recipes often focus on whole foods, lean proteins, healthy fats, and a variety of fruits and vegetables. Nutritional information is provided for transparency.'
    },
    {
      question: 'Can I find recipes tailored to specific health goals, such as weight loss or muscle gain?',
      answer: 'Yes, our website offers recipes tailored to various health goals, including weight management, muscle building, improved energy levels, and overall wellness. You can filter recipes based on your specific goals and preferences.'
    },
    {
      question: 'Are the ingredients for the recipes easy to find and affordable?',
      answer: 'We strive to use ingredients that are readily available in most grocery stores and are affordable for the average consumer. However, some recipes may include specialty ingredients, but we often provide alternatives or suggestions for substitutions to make them more accessible.'
    },
    {
      question: 'Do the recipes include nutritional information, such as calorie counts and macronutrient breakdowns?',
      answer: 'Yes, each recipe on our website typically includes nutritional information, including calorie counts, macronutrient breakdowns (protein, carbohydrates, fats), and sometimes micronutrient details. This information is provided to help users make informed choices about their meals.'
    },
    {
      question: 'Can I adjust the serving sizes of the recipes to fit my needs?',
      answer: 'Yes, our website usually allows users to adjust the serving sizes of recipes to accommodate their specific needs, whether they are cooking for one person, a family, or a larger group. Adjusting the serving size will automatically update the ingredient quantities accordingly for convenience and accuracy.'
    }
  ];

  const accountInfo = [
    
    {
      question: 'Are there any membership tiers or subscription options available on the healthy recipe website?',
      answer: 'To access premium features and exclusive content, the healthy recipe website may offer membership tiers or subscription options. These may include benefits such as ad-free browsing, advanced recipe filtering, exclusive recipes, and more. You can usually find information about membership options and pricing on the website membership or subscription page.'
    },
    {
      question: 'Can I personalize my user account with dietary preferences and allergies?',
      answer: 'Yes, after creating your account, you can usually customize your profile with dietary preferences, allergies, and any other relevant information. This allows the website to tailor recipe recommendations and meal plans to suit your specific needs and preferences.'
    },
    {
      question: 'What are the benefits of having a user account on the healthy recipe website?',
      answer: 'Having a user account allows you to save your favorite recipes, create shopping lists, rate and review recipes, and participate in community discussions. It also enables you to receive personalized recommendations based on your dietary preferences and past interactions with the website.'
    },
    {
      question: 'How do I change my password or update my account information?',
      answer: 'You can typically change your password or update your account information by logging into your user account and accessing the settings or profile section. From there, you should see options to edit your password, email address, dietary preferences, and other account details.'
    },
    {
      question: 'Can I access my user account from multiple devices?',
      answer: 'Yes, most healthy recipe websites offer the flexibility to access your user account from multiple devices, including smartphones, tablets, and computers. Your account information and preferences are usually synced across all devices for seamless user experience.'
    },
    {
      question: 'Is my personal information secure on the healthy recipe website?',
      answer: 'Yes, reputable healthy recipe websites prioritize user privacy and security. They typically use encryption protocols to protect your personal information, and they will not share your data with third parties without your consent. Additionally, you can review the website"s privacy policy to understand how your information is collected, used, and protected.'
    }
  ];

  const nutritionistInfo = [
    
    {
      question: 'Are there any membership tiers or subscription options available on the healthy recipe website?',
      answer: 'To access premium features and exclusive content, the healthy recipe website may offer membership tiers or subscription options. These may include benefits such as ad-free browsing, advanced recipe filtering, exclusive recipes, and more. You can usually find information about membership options and pricing on the website membership or subscription page.'
    },
    {
      question: 'How are the nutritionists qualified?',
      answer: 'Our nutritionists are typically registered dietitians or certified nutrition professionals with formal education and training in nutrition science. They possess expertise in areas such as food science, human physiology, and dietary counseling, enabling them to provide evidence-based guidance on healthy eating.'
    },
    {
      question: 'Can users consult with the nutritionists for personalized dietary advice?',
      answer: 'Yes, some healthy recipe websites offer the option for users to consult with nutritionists for personalized dietary advice and guidance. This may involve one-on-one consultations, meal planning assistance, or answering specific nutrition-related questions.'
    },
    {
      question: 'How can I find recipes tailored to my specific dietary needs and goals?',
      answer: 'Our nutritionists work to ensure that the recipes on our website cater to a wide range of dietary preferences, restrictions, and health goals. You can often filter recipes based on criteria such as vegetarian, vegan, gluten-free, low-carb, and more to find options that suit your needs.'
    },
    {
      question: 'Do the nutritionists provide educational resources on healthy eating?',
      answer: 'Yes, many healthy recipe websites include educational resources such as articles, blog posts, and nutrition guides written by nutritionists. These resources cover topics such as understanding macronutrients, making healthier food choices, and debunking common nutrition myths.'
    },
    {
      question: 'How can I contact the nutritionists for further questions or inquiries?',
      answer: 'If you have specific questions or inquiries for the nutritionists, you can often reach out to them through the website"s contact form or messaging system. Some websites may also offer a dedicated email address or support hotline for nutrition-related queries.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-yellow-300">
      <Navbar userRole={userRole} className="fixed top-0 left-0 right-0" />
      <div className="container mx-auto px-4 mt-12 mb-20">
        <section className="mt-6">
          <h2 className="text-5xl font-extrabold mb-4 text-blue-950">FAQ Sections</h2>
          <p className="text-xl text-blue-950 font-semibold">Start by selecting a topic below:</p>
          <div className="flex items-center mt-4">
            <button className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow self-end mr-2" onClick={() => handleOptionClick("mealplan")}>Meal Plan</button>
            <button className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow self-end mr-2" onClick={() => handleOptionClick("recipe")}>Recipe</button>
            <button className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow self-end mr-2" onClick={() => handleOptionClick("account")}>Account</button>
            <button className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow self-end mr-2" onClick={() => handleOptionClick("nutritionist")}>Nutritionist</button>
            <Link href="/CreateUserFeedback">
                <button className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow self-end mr-2">Report an issue!</button>
            </Link>
          </div>
        </section>

        <section className="mt-4">
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-screen mb-4">
          {selectedOption === "mealplan" && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-950">FAQs about Meal Plans</h2>
              <ul className="mb-4">
                {mealplanInfo.map((item, index) => (
                  <li key={item.question} className="mb-4">
                    <b className="font-bold text-blue-950">{index + 1}. {item.question}</b>
                    <p className="mt-2 ml-4 text-blue-950">{item.answer}</p>
                  </li>
                ))}
              </ul>
              {selectedOption && (
                <div className="mt-8 text-center font-bold">
                    <p className="mb-4 text-blue-950">Were these FAQs helpful?</p>
                    <button
                      className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow mr-2"
                      onClick={() => setIsSatisfied(true)}
                      aria-label="Mark FAQs as helpful"
                    >
                      Yes
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow"
                      onClick={() => setIsSatisfied(false)}
                      aria-label="Mark FAQs as not helpful"
                    >
                      No
                    </button>
                </div>
              )}
              {isSatisfied !== null && (
                  <div className="mt-8 text-center font-bold">
                    {isSatisfied ? (
                      <p className="text-blue-950">Thank you for your feedback! We're glad the FAQs were helpful.</p>
                    ) : (
                      <div>
                        <p className="text-blue-950"> We're sorry the FAQs didn't answer your question. Please reach out to us for further assistance! </p>
                        <Link href="/CreateUserFeedback" key="contact-us-link">
                          <button className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow mt-4"> Contact Us</button>
                        </Link>  
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}

          {selectedOption === "recipe" && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-950">FAQs about Recipes</h2>
              <ul className="mb-4">
                {recipeInfo.map((item, index) => (
                  <li key={item.question} className="mb-4">
                    <b className="font-bold text-blue-950">{index + 1}. {item.question}</b>
                    <p className="mt-2 ml-4 text-blue-950">{item.answer}</p>
                  </li>
                ))}
              </ul>
              {selectedOption && (
                <div className="mt-8 text-center font-bold">
                    <p className="mb-4 text-blue-950">Were these FAQs helpful?</p>
                    <button
                      className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow mr-2"
                      onClick={() => setIsSatisfied(true)}
                      aria-label="Mark FAQs as helpful"
                    >
                      Yes
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow"
                      onClick={() => setIsSatisfied(false)}
                      aria-label="Mark FAQs as not helpful"
                    >
                      No
                    </button>
                </div>
              )}
              {isSatisfied !== null && (
                  <div className="mt-8 text-center font-bold">
                    {isSatisfied ? (
                      <p className="text-blue-950">Thank you for your feedback! We're glad the FAQs were helpful.</p>
                    ) : (
                      <div>
                        <p className="text-blue-950"> We're sorry the FAQs didn't answer your question. Please reach out to us for further assistance! </p>
                        <Link href="/CreateUserFeedback" key="contact-us-link">
                          <button className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow mt-4"> Contact Us</button>
                        </Link>  
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}
            {selectedOption === "account" && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-950">FAQs about User's account</h2>
              <ul className="mb-4">
                {accountInfo.map((item, index) => (
                  <li key={item.question} className="mb-4">
                    <b className="font-bold text-blue-950">{index + 1}. {item.question}</b>
                    <p className="mt-2 ml-4 text-blue-950">{item.answer}</p>
                  </li>
                ))}
              </ul>
              {selectedOption && (
                <div className="mt-8 text-center font-bold">
                    <p className="mb-4 text-blue-950">Were these FAQs helpful?</p>
                    <button
                      className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow mr-2"
                      onClick={() => setIsSatisfied(true)}
                      aria-label="Mark FAQs as helpful"
                    >
                      Yes
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow"
                      onClick={() => setIsSatisfied(false)}
                      aria-label="Mark FAQs as not helpful"
                    >
                      No
                    </button>
                </div>
              )}
              {isSatisfied !== null && (
                  <div className="mt-8 text-center font-bold">
                    {isSatisfied ? (
                      <p className="text-blue-950">Thank you for your feedback! We're glad the FAQs were helpful.</p>
                    ) : (
                      <div>
                        <p className="text-blue-950"> We're sorry the FAQs didn't answer your question. Please reach out to us for further assistance! </p>
                        <Link href="/CreateUserFeedback" key="contact-us-link">
                          <button className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow mt-4"> Contact Us</button>
                        </Link>  
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}
            {selectedOption === "nutritionist" && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-950">FAQs about Nutritionists</h2>
              <ul className="mb-4">
                {nutritionistInfo.map((item, index) => (
                  <li key={item.question} className="mb-4">
                    <b className="font-bold text-blue-950">{index + 1}. {item.question}</b>
                    <p className="mt-2 ml-4 text-blue-950">{item.answer}</p>
                  </li>
                ))}
              </ul>
              {selectedOption && (
                <div className="mt-8 text-center font-bold">
                    <p className="mb-4 text-blue-950">Were these FAQs helpful?</p>
                    <button
                      className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow mr-2"
                      onClick={() => setIsSatisfied(true)}
                      aria-label="Mark FAQs as helpful"
                    >
                      Yes
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow"
                      onClick={() => setIsSatisfied(false)}
                      aria-label="Mark FAQs as not helpful"
                    >
                      No
                    </button>
                </div>
              )}
              {isSatisfied !== null && (
                  <div className="mt-8 text-center font-bold">
                    {isSatisfied ? (
                      <p className="text-blue-950">Thank you for your feedback! We're glad the FAQs were helpful.</p>
                    ) : (
                      <div>
                        <p className="text-blue-950"> We're sorry the FAQs didn't answer your question. Please reach out to us for further assistance! </p>
                        <Link href="/CreateUserFeedback" key="contact-us-link">
                          <button className="px-4 py-2 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow mt-4"> Contact Us</button>
                        </Link>  
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}
          </div>
        </section>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default LivechatwithBot;