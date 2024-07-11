import { useState } from 'react';
import axios from 'axios';
import Toastify from 'toastify-js';
import { useNavigate } from 'react-router-dom';
import video from '../components/assets/video.mp4';

export default function Login({ url }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const addedData = { email, password };
      const { data } = await axios.post(`${url}/login`, addedData);

      console.log(data);
      localStorage.setItem('access_token', data.accessToken);

      Toastify({
        text: 'Success Login',
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

      navigate('/user/recipe');  
    } catch (error) {
      Toastify({
        text: error.response?.data?.error || 'Login failed',
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
  }

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-base-200">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="hero-content flex-col lg:flex-row-reverse z-10">
          <div className="text-center lg:text-left text-white">
            <h1 className="text-5xl font-bold">Masak Apa</h1>
            <p className="py-6">
            Temukan, Bagikan, dan Inspirasi: Berbagai Resep di MasakApa
            </p>
          </div>
          <div className="card bg-grey w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="input input-bordered"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">
                  <a href="#" className="label-text text-white">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-accent">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}



