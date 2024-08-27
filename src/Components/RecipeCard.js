import React from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaHeart } from "react-icons/fa"; 
import { useFavorites } from "../Context/FavoritesContext"; 

const RecipeCard = ({ recipe }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(recipe.uri);

  
  const extractIdFromUri = (uri) => {
    const parts = uri.split("_");
    return parts[parts.length - 1];
  };

  const recipeId = extractIdFromUri(recipe.uri);

  console.log("Extracted Recipe ID:", recipeId);

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFavorite(recipe.uri);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Image wrapper with hover effect */}
      <div className="relative group overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.label}
          className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        {/* Optional overlay for additional hover effect */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 ease-in-out"></div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{recipe.label}</h2>
        <div className="flex justify-between items-center">
          <Link
            to={`/recipe-details/${recipeId}`} // Pass recipe ID in URL
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out flex items-center"
          >
            <FaInfoCircle className="mr-2" /> View Details
          </Link>
          <button
            onClick={handleFavoriteClick}
            className={`flex items-center transition-colors duration-300 ease-in-out ${
              isFav ? "text-red-600" : "text-gray-500"
            }`}
          >
            <FaHeart className="mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
