import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe';
import SearchRecipe from './components/SearchRecipe'; // Add this line
import FavoriteRecipes from './components/FavoriteRecipes'; // Add this line

function App() {
  return (
    <div className="App">
      <h2>Recipe Website</h2>
      <BrowserRouter>
        <div>
          <Link to="/">Home</Link> | <Link to="/add">Add Recipe</Link> | <Link to="/search">Search Recipe</Link> | <Link to="/favorites">Favorite Recipes</Link>
          <Switch>
            <Route exact path="/" component={RecipeList} />
            <Route path="/recipe/:id" component={RecipeDetails} />
            <Route path="/add" component={AddRecipe} />
            {/* Add new routes for Search and Favorites */}
            <Route path="/search" component={SearchRecipe} />
            <Route path="/favorites" component={FavoriteRecipes} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
