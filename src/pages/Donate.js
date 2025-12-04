import React, { useState } from 'react';

// FIX: Hardcoding the internal service name for Docker connectivity
const BASE_API_URL = 'http://backend:8000/api/'; 

function Donate() {
  // 1. State to manage form inputs
  const [formData, setFormData] = useState({
    donor_name: '',
    email: '',
    amount_or_item: '',
    description: ''
  });
  
  // NEW: State for visual feedback message
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null); // null, true, or false

  // 2. Handle typing in inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(''); // Clear message on new input
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setMessage('Submitting donation...');
    setIsSuccess(null); // Reset status
    
    // Construct the full URL for the donations endpoint
    const url = `${BASE_API_URL}donations/`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Thank you! Donation recorded.');
        setMessage('Thank you! Donation recorded successfully.');
        setIsSuccess(true);
        setFormData({ donor_name: '', email: '', amount_or_item: '', description: '' }); // Clear form
      } else {
        // Server rejected the data (400, 500 etc.)
        const errorData = await response.json();
        console.error('Failed to donate. Server response:', errorData);
        setMessage('Submission failed! Check the browser console (F12) for server details.');
        setIsSuccess(false);
      }
    } catch (error) {
      // Network failure (server is down or URL is wrong)
      console.error('Connection Error:', error);
      setMessage('Error connecting to the API. Is your Django backend running?');
      setIsSuccess(false);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Make a Donation</h2>

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
        
        {/* Note the name="..." attributes match the backend models exactly */}
        <input 
          name="donor_name"
          value={formData.donor_name}
          onChange={handleChange}
          type="text" 
          placeholder="Donor Name" 
          required
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 outline-none" 
        />
        <input 
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email" 
          placeholder="Email" 
          required
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 outline-none" 
        />
        <input 
          name="amount_or_item"
          value={formData.amount_or_item}
          onChange={handleChange}
          type="text" 
          placeholder="Amount (PKR) or Item Name" 
          required
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 outline-none" 
        />
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Purpose of Donation (Optional)" 
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 outline-none h-24"
        ></textarea>
        
        <button type="submit" className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 transition duration-300 transform hover:scale-[1.01]">
          Complete Donation
        </button>
      </form>
    </div>
  );
}

export default Donate;