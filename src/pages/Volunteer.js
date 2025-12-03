import React, { useState } from 'react';

function Volunteer() {
  // State to manage form inputs, matching backend model fields
  const [formData, setFormData] = useState({
    full_name: '', // Maps to 'full_name' in api/models.py
    email: '',
    city: '',
    reason: ''     // Maps to 'reason' in api/models.py
  });

  // Handle typing in inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission (POST request to Django API)
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      // POST request to the Volunteer API endpoint
      const response = await fetch('http://localhost:8000/api/volunteers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Volunteer application submitted successfully!');
        // Clear form after successful submission
        setFormData({ full_name: '', email: '', city: '', reason: '' }); 
      } else {
        alert('Failed to submit application. Please check your network.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server. Is the Django server running?');
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Become a Volunteer</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 p-8 border border-gray-200 rounded-xl shadow-lg bg-white">
        
        <input 
          name="full_name" // Required for state management
          value={formData.full_name}
          onChange={handleChange}
          type="text" 
          placeholder="Your Full Name" 
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
        <input 
          name="city" // Required for state management
          value={formData.city}
          onChange={handleChange}
          type="text" 
          placeholder="City" 
          required
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-200 outline-none" 
        />
        <textarea 
          name="reason" // Required for state management
          value={formData.reason}
          onChange={handleChange}
          placeholder="Why do you want to volunteer?" 
          required
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-200 outline-none h-32"
        ></textarea>
        
        <button type="submit" className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 transition duration-300 transform hover:scale-[1.01]">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default Volunteer;