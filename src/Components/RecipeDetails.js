import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFavorites } from "../Context/FavoritesContext";

const RecipeDetails = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    console.log("Extracted Recipe ID:", id);

    if (id) {
      const fetchRecipe = async () => {
        try {
          const apiUrl = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=130fac5c&app_key=29e06fb42da94af9d8d3aee74dedd50e`;

          const response = await fetch(apiUrl, {
            headers: {
              Accept: "application/json",
              "Accept-Language": "en",
            },
          });

          const data = await response.json();

          console.log("Fetched Recipe Data:", data);

          setRecipe(data.recipe);
        } catch (error) {
          console.error("Error fetching recipe details:", error.message);
        }
      };

      fetchRecipe();
    } else {
      console.error("Invalid recipe ID");
    }
  }, [id]);

  if (!recipe) {
    return <div className="text-center py-4">Loading recipe details...</div>;
  }

  const handleFavoriteClick = () => {
    if (isFavorite(recipe.uri)) {
      removeFavorite(recipe.uri);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">{recipe.label}</h1>
      <div className="flex flex-col lg:flex-row lg:items-start mb-8">
        <img
          src={recipe.image}
          alt={recipe.label}
          className="w-full lg:w-1/2 h-auto object-cover rounded-lg shadow-md mb-6 lg:mb-0 lg:mr-6"
        />
        <div className="flex-1">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {recipe.ingredientLines &&
                recipe.ingredientLines.map((ingredient, index) => (
                  <li key={index} className="mb-2">
                    {ingredient}
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Instructions
            </h2>
            <p className="text-gray-700">
              {recipe.instructions || "Instructions not available"}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Nutritional Information
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Calories:{" "}
                {recipe.calories ? Math.round(recipe.calories) : "N/A"}
              </li>
              <li>
                Total Weight:{" "}
                {recipe.totalWeight ? Math.round(recipe.totalWeight) : "N/A"} g
              </li>
              {recipe.totalNutrients &&
                Object.keys(recipe.totalNutrients).map((nutrient, index) => (
                  <li
                    key={index}
                  >{`${nutrient}: ${recipe.totalNutrients[nutrient].quantity} ${recipe.totalNutrients[nutrient].unit}`}</li>
                ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Diet Labels
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {recipe.dietLabels &&
                recipe.dietLabels.map((label, index) => (
                  <li key={index} className="mb-2">
                    {label}
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Meal Type
            </h2>
            <p className="text-gray-700">
              {recipe.mealType && recipe.mealType.join(", ")}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Cuisine Type
            </h2>
            <p className="text-gray-700">
              {recipe.cuisineType && recipe.cuisineType.join(", ")}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Health Labels
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {recipe.healthLabels &&
                recipe.healthLabels.map((label, index) => (
                  <li key={index} className="mb-2">
                    {label}
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Source
            </h2>
            <a
              href={recipe.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {recipe.source}
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between mt-8">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mb-4 lg:mb-0"
        >
          Back to Recipes
        </Link>
        <button
          onClick={handleFavoriteClick}
          className={`px-6 py-3 ${
            isFavorite(recipe.uri) ? "bg-yellow-600" : "bg-yellow-500"
          } text-white rounded-lg shadow-md hover:bg-yellow-700 transition duration-300`}
        >
          {isFavorite(recipe.uri)
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
