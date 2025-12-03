import React, { useState, useEffect } from 'react';

function Dashboard() {
  // 1. State to hold the data from the backend
  const [stats, setStats] = useState({
    total_raised: 0,
    donations_count: 0,
    volunteers_count: 0,
    cities_covered: 0
  });

  // 2. useEffect to fetch data when the page loads
  useEffect(() => {
    fetch('http://localhost:8000/api/stats/')
      .then(response => response.json())
      .then(data => {
        console.log("Data fetched:", data); // Check console to see if it works
        setStats(data);
      })
      .catch(error => console.error('Error fetching stats:', error));
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
      
      {/* ... keep the Recent Activities section static for now ... */}
    </div>
  );
}

export default Dashboard;