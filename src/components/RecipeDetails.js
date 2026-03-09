import React, { useEffect, useState } from 'react';
import './RecipeDetails.css';

const API_KEY = 'd8618d4cc0584b3081dd1fea228bc143';

const RecipeDetails = ({ id, onBack }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading recipe details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!recipe) return null;

  return (
    <div className="recipe-details">
      <button className="back-btn" onClick={onBack}>&larr; Back to Search</button>
      <div className="details-header">
        <img src={recipe.image} alt={recipe.title} className="details-image" />
        <div className="details-header-info">
          <h2>{recipe.title}</h2>
          <div className="recipe-meta">
            <span>⏱ {recipe.readyInMinutes} mins</span>
            <span>👥 {recipe.servings} servings</span>
            <span>♥️ {recipe.aggregateLikes} likes</span>
          </div>
        </div>
      </div>
      
      <div className="details-content">
        <div className="ingredients">
          <h3>Ingredients</h3>
          <ul>
            {recipe.extendedIngredients?.map((item) => (
              <li key={item.id}>{item.original}</li>
            ))}
          </ul>
        </div>
        
        <div className="instructions">
          <h3>Instructions</h3>
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions || 'No instructions provided.' }} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
