import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddRecipe() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);

    axios.post('http://localhost:3000/recipe', formData)
      .then(response => {
        toast.success('Recipe added successfully');
      })
      .catch(error => {
        toast.error('Failed to add recipe');
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-4">Add Recipe</h1>
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
        <button type="submit" className="btn btn-primary">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;
