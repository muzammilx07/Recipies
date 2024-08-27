import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Recipe from "./Pages/Recipe";
import Favorites from "./Pages/Favorites";
import RecipeDetails from "./Components/RecipeDetails";
import { FavoritesProvider } from "./Context/FavoritesContext";

const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe-details/:id" element={<RecipeDetails />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
