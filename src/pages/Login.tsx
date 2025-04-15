'use client';

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser, UserLogin, LoginResponse } from "../api/usersApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // AuthContext ni import qilamiz
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth(); // AuthContext dan login funksiyasini olamiz
  const [formData, setFormData] = useState<UserLogin>({
    phone_number: "",
    password: "",
  });

  const mutation = useMutation<LoginResponse, Error, UserLogin>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data)
      login(data.token, data.user);

      toast.success(`Login successful! Welcome back, ${data.user.name}`);
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
    
      if (name === "phone_number") {
        const cleanedValue = value.replace(/[^+\d]/g, ""); // faqat + va raqamlar qolsin
        setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="mt-20 max-w-md mx-auto px-5">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium">
            {t("register.phone_number")}
          </label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder={t("register.phone_number")}
            required
            pattern="^\+998\d{9}$"
            title="Telefon raqam +998 bilan boshlanishi va jami 13 ta belgi bo'lishi kerak (masalan: +998901234567)"
            maxLength={13}
            inputMode="numeric"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            {t("register.password")}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder={t("register.password")}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={mutation.isPending} // react-query v5+ da isPending ishlatiladi
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;