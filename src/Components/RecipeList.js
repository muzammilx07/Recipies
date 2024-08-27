import React from "react";
import RecipeCard from "./RecipeCard";
import SkeletonCard from "./SkeletonCard";

const RecipeList = ({ recipes = [], loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {loading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      ) : recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.recipe.uri} recipe={recipe.recipe} />
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
