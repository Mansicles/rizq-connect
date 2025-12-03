import React, { useState } from 'react';

function Donate() {
  // 1. State to manage form inputs
  const [formData, setFormData] = useState({
    donor_name: '',
    email: '',
    amount_or_item: '',
    description: ''
  });

  // 2. Handle typing in inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page from refreshing
    try {
      const response = await fetch('http://localhost:8000/api/donations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you! Donation recorded.');
        setFormData({ donor_name: '', email: '', amount_or_item: '', description: '' }); // Clear form
      } else {
        alert('Failed to donate. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server.');
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Make a Donation</h2>
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