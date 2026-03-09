import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="recipe-card" onClick={() => onClick(recipe.id)}>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
