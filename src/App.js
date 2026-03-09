import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';

const API_KEY = 'd8618d4cc0584b3081dd1fea228bc143';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [searched, setSearched] = useState(false);

  const fetchRecipes = async (query) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    setSelectedRecipeId(null);
    
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&apiKey=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch recipes, please check your API key and limit');
      }
      const data = await response.json();
      setRecipes(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (id) => {
    setSelectedRecipeId(id);
  };

  const handleBackToSearch = () => {
    setSelectedRecipeId(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🍽️ Recipe Finder</h1>
      </header>
      
      <main className="app-main">
        {!selectedRecipeId ? (
          <>
            <SearchBar onSearch={fetchRecipes} />
            
            {loading && <div className="loading">Searching for delicious recipes...</div>}
            {error && <div className="error">{error}</div>}
            
            {!loading && !error && recipes.length > 0 && (
              <div className="recipe-grid">
                {recipes.map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onClick={handleRecipeClick} 
                  />
                ))}
              </div>
            )}
            
            {!loading && !error && searched && recipes.length === 0 && (
              <div className="no-results">No recipes found for your search. Try another query!</div>
            )}
          </>
        ) : (
          <RecipeDetails id={selectedRecipeId} onBack={handleBackToSearch} />
        )}
      </main>
    </div>
  );
}

export default App;
