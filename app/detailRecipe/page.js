"use client";
import ABCsoup from '@/components/ABCsoup';
import Bibimbap from '@/components/Bibimbap';
import RecipeDetails from '@/components/RecipePage';
import SteamedEgg from '@/components/Steamedegg';
import VegetarianBurrito from '@/components/VegetarianBurrito';
import { useSearchParams } from 'next/navigation';

const RecipeDet = () => {
  const searchParams = useSearchParams();
  const recipeName = searchParams.get('recipeName');

    const renderRecipeComponent = () => {
        switch (recipeName) {
          case 'Homemade Fish & Chips':
            return <RecipeDetails/>;
          case 'Vegetarian Burrito':
            return <VegetarianBurrito/>;
          case 'Steamed Egg':
            return  <SteamedEgg/>;
          case 'Bibimbap':
            return <Bibimbap/>;
          case 'ABC Soup':
            return <ABCsoup/>;
          default:
            return <p>Recipe not found</p>;
        }
      };
return (
    <main>
     {renderRecipeComponent()}



    
    </main>
);
};

export default RecipeDet ;