import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function SearchRecipe(props) {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Fetch recipes from the MealDB API based on the search term
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the recipes state with the fetched data
        setRecipes(data.meals);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  };

  const handleTitleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Fetch and display random recipes when the component mounts
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.meals);
      })
      .catch((error) => {
        console.error('Error fetching random recipes:', error);
      });
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <div>
      <TextField
        id="searchTerm"
        autoFocus
        fullWidth
        label="Search Term"
        name="searchTerm"
        value={searchTerm}
        onChange={handleTitleChange}
      />
      <Button
        id="searchRecipe"
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleSearch}
      >
        Search Recipe
      </Button>
      {/* Display the fetched recipes */}
      {recipes.map((recipe) => (
        <div key={recipe.idMeal} style={{ marginBottom: 20 }}>
          <h3>{recipe.strMeal}</h3>
          <img src={`${recipe.strMealThumb}/preview`} alt={recipe.strMeal} style={{ maxWidth: '100%' }} />
          <p>{recipe.strInstructions}</p>
          <a href={`${recipe.strMealThumb}/preview`} target="_blank" rel="noopener noreferrer">
            Add /preview
          </a>
        </div>
      ))}
    </div>
  );
}

// required property:  addCourse is a function to call to perform the Add action
SearchRecipe.propTypes = {
  addCourse: PropTypes.func.isRequired,
};

export default SearchRecipe;
