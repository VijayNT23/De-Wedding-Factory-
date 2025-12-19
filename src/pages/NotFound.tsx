import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black mb-4">404</h1>
        <h2 className="text-2xl font-serif text-gray-600 mb-6">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
