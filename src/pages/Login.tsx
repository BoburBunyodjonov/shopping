'use client'

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser, UserLogin, LoginResponse } from "../api/usersApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginResponse | null>(null);
  const [formData, setFormData] = useState<UserLogin>({
    phone_number: "",
    password: "",
  });

  useEffect(() => {
    if (loginData) {
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("access", loginData.user.access.toString());
      localStorage.setItem("user", JSON.stringify(loginData.user));
    }
  }, [loginData]);

  const mutation = useMutation<LoginResponse, Error, UserLogin>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success(`Login successful! Welcome back, ${data.user.name}`);
      setLoginData(data);
      setFormData({
        phone_number: "",
        password: "",
      });
      setTimeout(() => {
        navigate('/');
      }, 1000);
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
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
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={mutation.status === "pending"}
        >
          {mutation.status === "pending" ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
