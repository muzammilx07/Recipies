import React from "react";
import { useFavorites } from "../Context/FavoritesContext"; 
import RecipeCard from "./RecipeCard"; 

const FavoriteRecipes = () => {
  const { favorites } = useFavorites(); 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <RecipeCard key={recipe.uri} recipe={recipe} />
          ))
        ) : (
          <p>No favorite recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
