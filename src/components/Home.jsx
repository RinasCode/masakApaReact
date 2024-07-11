import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/public/recipe')
      .then(response => {
        console.log(response.data.data); 
        setRecipes(response.data.data); 
      })
      .catch(error => {
        toast.error('Failed to fetch recipes');
      });
  }, []);

  return (
    <>
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-4">Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(recipes) ? recipes.map(recipe => (
          <div key={recipe.id} className="card w-full bg-base-100 shadow-xl">
            <figure>
              <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{recipe.name}</h2>
              <p>{recipe.instructions}</p>
            </div>
          </div>
        )) : <p>No recipes found.</p>}
      </div>
    </div>
    </>
  );
}

export default Home;
