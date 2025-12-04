import React, { useState, useEffect } from 'react';

// FIX: Hardcoding the internal Docker network URL to ensure the 
// frontend container can communicate with the 'backend' container.
const BASE_API_URL = 'http://backend:8000/api/';

function Dashboard() {
  // 1. State to hold the data from the backend
  const [stats, setStats] = useState({
    total_raised: 0,
    donations_count: 0,
    volunteers_count: 0,
    cities_covered: 3
  });

  // 2. useEffect to fetch data when the page loads
  useEffect(() => {
    // FIX APPLIED: Using the internal service name 'backend'
    const url = `${BASE_API_URL}stats/`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
            // Throw an error if the HTTP status is not 2xx
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Dashboard Data fetched successfully:", data); 
        setStats(data);
      })
      .catch(error => console.error('Error fetching dashboard stats. Is Django running and the stats endpoint defined?', error));
  }, []);

  return (
    <div className="p-8 text-center bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-emerald-700 mb-8">Rizq Connect Impact Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        
        {/* Card 1: Donations Received */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-700">Total Donations (PKR)</h3>
          {/* 3. Display the real data */}
          <p className="text-4xl font-extrabold text-emerald-600 mt-2">
            {stats.total_raised.toLocaleString()}
          </p>
        </div>
        
        {/* Card 2: Donations Count */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-700">Total Donations</h3>
          <p className="text-4xl font-extrabold text-emerald-600 mt-2">{stats.donations_count}</p>
        </div>
        
        {/* Card 3: Active Volunteers */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-700">Active Volunteers</h3>
          <p className="text-4xl font-extrabold text-emerald-600 mt-2">{stats.volunteers_count}</p>
        </div>
        
        {/* Card 4: Cities Covered */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-700">Cities Covered</h3>
          <p className="text-4xl font-extrabold text-emerald-600 mt-2">{stats.cities_covered}</p>
        </div>
      </div>
      
      {/* If your backend provides data for recent activities, you'd fetch it here. */}
    </div>
  );
}

export default Dashboard;