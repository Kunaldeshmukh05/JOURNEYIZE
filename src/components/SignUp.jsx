import React, { useState } from 'react';
import axios from 'axios';
import './UserPost/AddPost'
import AddPost from './UserPost/AddPost';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };                                

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach(key => form.append(key, formData[key]));

    try {
      const response = await axios.post('/register', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <input
          type="file"
          name="profilePicture"
          onChange={handleFileChange}
          className="w-full px-3 py-2 mb-4"
        />
        <button
          type="submit" onSubmit={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>
      </form>
      <AddPost></AddPost>
    </div>
  );
};

export default Register;




