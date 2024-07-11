import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function DeleteRecipe() {
  const { id } = useParams();

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/recipe/${id}`)
      .then(response => {
        toast.success('Recipe deleted successfully');
      })
      .catch(error => {
        toast.error('Failed to delete recipe');
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-4">Delete Recipe</h1>
      <button onClick={handleDelete} className="btn btn-danger">Delete Recipe</button>
    </div>
  );
}

export default DeleteRecipe;
