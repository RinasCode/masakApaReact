import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';
import DeleteRecipe from './components/DeleteRecipe';
import PatchImage from './components/PatchImage';
import Login from './components/Login';
import Register from './components/Register';
import UserRecipes from './components/UserRecipes';  // Import komponen UserRecipes
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const apiUrl = 'http://localhost:3000';  // URL API backend Anda

  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          <Route path="/delete-recipe/:id" element={<DeleteRecipe />} />
          <Route path="/patch-image/:id" element={<PatchImage />} />
          <Route path="/login" element={<Login url={apiUrl} />} />  // Pass apiUrl to Login
          <Route path="/register" element={<Register />} />
          <Route path="/user/recipe" element={<UserRecipes url={apiUrl} />} /> 
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;


