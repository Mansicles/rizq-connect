import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center p-16 bg-gray-50 flex flex-col items-center justify-center min-h-[calc(100vh-140px)]">
      {/* Updated: text-emerald-700 */}
      <h1 className="text-6xl font-extrabold text-emerald-700 mb-6">
        Feed the Need, Connect the Community
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl">
        Rizq Connect is a charitable platform dedicated to fighting hunger by connecting food donors with those in need through a transparent and efficient system.
      </p>
      {/* Updated: Larger size, rounded-lg, strong shadow, and hover effect */}
      <Link to="/donate" className="bg-emerald-600 text-white px-8 py-4 text-lg rounded-lg shadow-xl hover:bg-emerald-700 transition duration-300 transform hover:scale-105">
        Donate Now
      </Link>
    </div>
  );
}

export default Home;
