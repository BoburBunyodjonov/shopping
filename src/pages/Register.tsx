'use client';

import React, { useState, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser, UserRegistration, UserResponse } from "../api/usersApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useTranslation } from "react-i18next";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();
  const [formData, setFormData] = useState<UserRegistration>({
    name: "",
    password: "",
    phone_number: "",
    location: "",
  });

  // Parol kuchini hisoblash
  const passwordStrength = useMemo(() => {
    const { password } = formData;
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 3;
    return 2;
  }, [formData.password]);



  const mutation = useMutation<UserResponse, Error, UserRegistration>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      login(data.token, data.user);
      toast.success(`User registered successfully! Welcome, ${data.user.name}`);
      navigate('/');
    },
    onError: (error) => {
      let errorMessage = "Registration failed";
      if (error instanceof Error) {
        try {
          const serverError = JSON.parse(error.message);
          errorMessage = serverError.message || errorMessage;
        } catch {
          errorMessage = error.message;
        }
      }
      toast.error(errorMessage);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    if (formData.name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <div className="pt-20 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t("register.title")}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            {t("register.name")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            minLength={3}
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium mb-1">
            {t("register.phone_number")}
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            {t("register.password")}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            minLength={6}
            autoComplete="new-password"
          />
          <div className="flex items-center mt-1">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${
                  passwordStrength === 0 ? 'bg-gray-200' :
                  passwordStrength === 1 ? 'bg-red-500' :
                  passwordStrength === 2 ? 'bg-yellow-400' : 'bg-green-500'
                }`} 
                style={{ width: `${(passwordStrength / 3) * 100}%` }}
              />
            </div>
            <span className="text-xs ml-2 text-gray-500">
              {passwordStrength === 0 ? '' :
               passwordStrength === 1 ? 'Weak' :
               passwordStrength === 2 ? 'Medium' : 'Strong'}
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            {t("register.location")}
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            autoComplete="address-level2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t("register.submit")}...
            </span>
          ) : t("register.submit")}
        </button>

        <div className="text-center text-sm mt-4">
          {t('register.have_account')} {" "}
          <button 
            type="button"
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;