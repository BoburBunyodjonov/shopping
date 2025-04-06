import React from "react";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

const Register: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar logoText="ShopEasy" />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">{t("register.title")}</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t("register.name")}</label>
            <input
              type="text"
              className="w-full border rounded-md p-2"
              placeholder={t("register.name")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t("register.email")}</label>
            <input
              type="email"
              className="w-full border rounded-md p-2"
              placeholder={t("register.email")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t("register.password")}</label>
            <input
              type="password"
              className="w-full border rounded-md p-2"
              placeholder={t("register.password")}
            />
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded-md">
            {t("register.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
