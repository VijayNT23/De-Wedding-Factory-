import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // import from firebase.ts
import bgImage from "./assets/Login.png"; // your background image
import LogoWhite from './assets/Logo-white.png';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("admin@win.com");
  const [password, setPassword] = useState("win123");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/admin-panel";
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative bg-black"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Logo */}
      <div className="relative mb-10 z-10 transition-transform duration-300 hover:scale-105">
        <a href="./">
          <img src={LogoWhite} alt="De Wedding Factory" className="h-20 w-auto" />
        </a>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-3xl font-serif mb-6 text-center">
          Admin <span className="italic">Login</span>
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-sm p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
