// FavoritesContext.js
import React, { createContext, useState, useContext } from "react";

// Create a Context for the favorites
const FavoritesContext = createContext();

// Create a Provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (recipe) => {
    setFavorites((prevFavorites) => [...prevFavorites, recipe]);
  };

  const removeFavorite = (recipeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((recipe) => recipe.uri !== recipeId)
    );
  };

  const isFavorite = (recipeId) => {
    return favorites.some((recipe) => recipe.uri === recipeId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook for using favorites context
export const useFavorites = () => useContext(FavoritesContext);
