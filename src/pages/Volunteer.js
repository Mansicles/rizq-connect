import React, { useState } from 'react';

// FIX: Hardcoding the internal Docker network URL to ensure the 
// frontend container can communicate with the 'backend' container.
const BASE_API_URL = 'http://backend:8000/api/';

function Volunteer() {
  // State to manage form inputs, matching backend model fields
  const [formData, setFormData] = useState({
    full_name: '', // Maps to 'full_name' in api/models.py
    email: '',
    city: '',
    reason: ''     // Maps to 'reason' in api/models.py
  });

  // NEW: State for visual feedback message
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null); // null, true, or false

  // Handle typing in inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(''); // Clear message on new input
  };

  // Handle Form Submission (POST request to Django API)
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setMessage('Submitting application...');
    setIsSuccess(null); // Reset status
    
    // Construct the full URL for the volunteers endpoint
    const url = `${BASE_API_URL}volunteers/`;

    try {
      // POST request to the Volunteer API endpoint using the correct internal URL
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Volunteer application submitted successfully!');
        setMessage('Volunteer application submitted successfully!');
        setIsSuccess(true);
        // Clear form after successful submission
        setFormData({ full_name: '', email: '', city: '', reason: '' }); 
      } else {
        const errorData = await response.json();
        console.error('Failed to submit application. Server Response:', errorData);
        setMessage('Submission failed! Check the browser console (F12) for server details.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Connection Error:', error);
      setMessage('Error connecting to the API. Is your Django backend running?');
      setIsSuccess(false);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Become a Volunteer</h2>

      {/* NEW: Message Display */}
      {message && (
        <div 
          className={`max-w-xl mx-auto p-4 mb-4 rounded-lg text-center font-semibold ${
            isSuccess === true ? 'bg-green-100 text-green-700' : 
            isSuccess === false ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
          }`}
        >
          {message}
        </div>
      )}
      {/* End Message Display */}
      
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