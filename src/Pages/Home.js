import React, { useState, useEffect } from "react";
import RecipeSearch from "../Components/RecipeSearch";
import RecipeList from "../Components/RecipeList";

const APP_ID = "130fac5c"; 
const APP_KEY = "29e06fb42da94af9d8d3aee74dedd50e"; 

const healthyRecipes = [
  "chicken",
  "beef",
  "vegetarian",
  "pasta",
  "salad",
  "smoothie",
  "quinoa",
  "tofu",
  "soup",
  "fish",
];

const getRandomHealthyRecipe = () => {
  const randomIndex = Math.floor(Math.random() * healthyRecipes.length);
  return healthyRecipes[randomIndex];
};

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const randomRecipe = getRandomHealthyRecipe();
    fetchRecipes(randomRecipe);
  }, []);

  const handleSearch = (query) => {
    fetchRecipes(query);
  };

  return (
    <div className="container mx-auto p-4">
      <RecipeSearch onSearch={handleSearch} />
      <RecipeList recipes={recipes} loading={loading} />
      <footer className="m-8 flex justify-center">
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/muzammilx07"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://simpleicons.org/icons/github.svg"
              alt="GitHub"
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/muzammil/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://simpleicons.org/icons/linkedin.svg"
              alt="LinkedIn"
              className="w-6 h-6"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
