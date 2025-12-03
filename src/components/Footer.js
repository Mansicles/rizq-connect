import React from 'react';

function Footer() {
  return (
    <footer className="bg-emerald-800 text-white p-6 text-center mt-auto shadow-inner">
      <p>&copy; {new Date().getFullYear()} Rizq Connect. All rights reserved.</p>
    </footer>
  );
}

export default Footer;