import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser, UserRegistration, UserResponse } from "../api/usersApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<UserRegistration>({
    name: "",
    password: "",
    phone_number: "",
    location: "",
  });

  const mutation = useMutation<UserResponse, Error, UserRegistration>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Save the token to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("access", data.user.access.toString());

      // Show success toast
      toast.success(`User registered successfully! Welcome, ${data.user.name}`);

      // Reset the form
      setFormData({
        name: "",
        password: "",
        phone_number: "",
        location: "",
      });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage); // Display server error or fallback message
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium">
            Phone Number
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter your location"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={mutation.status === "pending"}
        >
          {mutation.status === "pending" ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
