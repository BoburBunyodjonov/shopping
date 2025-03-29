import React from "react";
import Navbar from "../components/Navbar";

const Register: React.FC = () => {
  return (
    <div>
      <Navbar logoText="ShopEasy" />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border rounded-md p-2"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md p-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-md p-2"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded-md">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
