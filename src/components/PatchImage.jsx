import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function PatchImage() {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    axios.patch(`http://localhost:3000/recipe/${id}`, formData)
      .then(response => {
        toast.success('Image updated successfully');
      })
      .catch(error => {
        toast.error('Failed to update image');
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-4">Update Image</h1>
      <form onSubmit={handleSubmit} className="form-control">
        <div className="mb-4">
          <label className="block mb-2">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Image</button>
      </form>
    </div>
  );
}

export default PatchImage;
