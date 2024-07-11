import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';

export default function UserRecipes({ url }) {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const { data } = await axios.get(`${url}/user/recipe`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipes(data.data); // Adjust this according to your API response structure
      } catch (error) {
        console.error('Failed to fetch user recipes', error);
      }
    };

    fetchRecipes();
  }, [url]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`${url}/recipe/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the recipe list after deletion
      setRecipes(recipes.filter((recipe) => recipe.id !== id));

      Toastify({
        text: 'Recipe deleted successfully',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'left',
        stopOnFocus: true,
        style: {
          background: '#00B29F',
          color: '#17202A',
          boxShadow: '0 5px 10px black',
          fontWeight: 'bold',
        },
      }).showToast();
      setSelectedRecipe(null); // Close the modal
    } catch (error) {
      console.error('Failed to delete recipe', error);
      Toastify({
        text: 'Failed to delete recipe',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'left',
        stopOnFocus: true,
        style: {
          background: '#EF4C54',
          color: '#17202A',
          boxShadow: '0 5px 10px black',
          fontWeight: 'bold',
        },
      }).showToast();
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-recipe/${id}`);
  };

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
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={() => setSelectedRecipe(recipe)}>View Recipe</button>
                </div>
              </div>
            </div>
          )) : <p>No recipes found.</p>}
        </div>
      </div>

      {selectedRecipe && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold">{selectedRecipe.name}</h2>
            <p>{selectedRecipe.instructions}</p>
            <div className="modal-action">
              <button className="btn btn-warning" onClick={() => handleEdit(selectedRecipe.id)}>Edit Recipe</button>
              <button className="btn btn-error" onClick={() => handleDelete(selectedRecipe.id)}>Delete Recipe</button>
              <button className="btn" onClick={() => setSelectedRecipe(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


