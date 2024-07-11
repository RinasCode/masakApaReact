import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditRecipe() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/recipe/${id}`)
      .then(response => {
        const recipe = response.data;
        setName(recipe.name);
        setIngredients(recipe.ingredients); // assuming 'ingredients' field exists in your response
        setDescription(recipe.description);
        // You may need additional logic to handle image state if required
      })
      .catch(error => {
        toast.error('Failed to fetch recipe details');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('ingredients', ingredients); // update if 'ingredients' is included
    formData.append('description', description);
    formData.append('image', image);

    axios.put(`http://localhost:3000/recipe/${id}`, formData)
      .then(response => {
        toast.success('Recipe updated successfully');
      })
      .catch(error => {
        toast.error('Failed to update recipe');
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-4">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="form-control">
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Recipe</button>
      </form>
    </div>
  );
}

export default EditRecipe;

