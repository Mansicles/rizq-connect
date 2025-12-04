import React, { useState } from 'react';

// FIX: Hardcoding the internal Docker network URL to avoid the 
// 'ReferenceError: process is not defined' error and ensure the 
// frontend container can communicate with the 'backend' container.
const BASE_API_URL = 'http://backend:8000/api/';

function Contact() {
  // State to manage form inputs, matching backend model fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '' // Maps to 'message' in api/models.py
  });

  // Handle typing in inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission (POST request to Django API)
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    // Construct the full URL for the contact endpoint
    const url = `${BASE_API_URL}contact/`;
    
    try {
      // POST request to the Contact API endpoint using the correct internal URL
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // NOTE: Replacing alert() with console.log()
        console.log('Message sent successfully! We will be in touch soon.');
        // Clear form after successful submission
        setFormData({ name: '', email: '', message: '' }); 
      } else {
        const errorData = await response.json();
        console.error('Failed to send message. Server Response:', errorData);
        // NOTE: Replacing alert() with console.log()
        console.log('Failed to send message. Please check the console for server errors.');
      }
    } catch (error) {
      console.error('Connection Error:', error);
      // NOTE: Replacing alert() with console.log()
      console.log('Error connecting to server. Please verify Docker containers are running.');
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 p-8 border border-gray-200 rounded-xl shadow-lg bg-white">
        
        <input 
          name="name" // Required for state management
          value={formData.name}
          onChange={handleChange}
          type="text" 
          placeholder="Name" 
          required
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-200 outline-none" 
        />
        <input 
          name="email" // Required for state management
          value={formData.email}
          onChange={handleChange}
          type="email" 
          placeholder="Email" 
          required
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-200 outline-none" 
        />
        <textarea 
          name="message" // Required for state management
          value={formData.message}
          onChange={handleChange}
          placeholder="Message" 
          required
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-200 outline-none h-32"
        ></textarea>
        
        <button type="submit" className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 transition duration-300 transform hover:scale-[1.01]">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;