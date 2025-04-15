'use client';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { IProductProps } from "../api/productsApi";
import { post } from "../api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../AuthContext"; // AuthContext ni import qilamiz
import { useUser } from "../hooks/useUser";
// import { useUser } from "../hooks/useUser";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {isLoggedIn, user } = useAuth();
  const { userInfo } = useUser(user?.id?.toString() || '');

  const [page, setPage] = useState(1); 
  const take = 16;

  const fetchFilteredProducts = async (): Promise<IProductProps> => {
    return await post<IProductProps>(`/products/filter?page=${page}&take=${take}`, { take, page });
  };

  const { data: products, isLoading, isError } = useQuery<IProductProps, Error>({
    queryKey: ["products/filter", page, take],
    queryFn: fetchFilteredProducts,
    staleTime: 5000,
  });

  const handleProductClick = () => {
    if (userInfo?.access && isLoggedIn) {
      navigate('/products');
    }else if(isLoggedIn) {
        alert("Mahsulotlarni ko'rish uchun sizda ruxsat yo'q, Ruxsat olish uchun Adminga murojat qiling!")
    } else {
      navigate('/register');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{t("error.fetchingProducts")}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Welcome Message with User Name */}
      {/* {isLoggedIn && (
        <motion.div
          className="mb-6 bg-blue-50 p-4 rounded-md"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-blue-800">
            {t("home.welcomeBack")}, {user?.name}!
          </h2>
        </motion.div>
      )} */}

      {/* About Section */}
      <motion.div
        className="mb-12 bg-gray-100 p-6 rounded-md shadow-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">{t("home.aboutTitle")}</h2>
        <p className="text-gray-700">{t("home.aboutText")}</p>
      </motion.div>

      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {t("home.welcome")}
      </motion.h1>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {products?.data.map((product) => (
          <motion.div
            key={product.id}
            className="border border-[#b7b7b7] rounded-lg p-3 hover:shadow-xl cursor-pointer transition-transform transform hover:scale-99 bg-white"
            onClick={handleProductClick}
            whileHover={{ scale: 1.05 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <img
              src={product.image_url[0]}
              alt={product.title}
              className="w-full object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800 truncate">{product.title}</h2>
            {/* <p className="text-green-500 font-semibold mt-2">
              ${Number(product.price).toFixed(2)}
            </p> */}
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {products && products.total > take && (
        <div className="flex items-center justify-center mt-8 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {t("product.previous")}
          </button>

          <span className="text-lg font-medium text-gray-700">
            {t("product.page")} <span className="font-bold">{page}</span> / {Math.ceil(products.total / take)}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page * take >= products.total}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition duration-300 flex items-center"
          >
            {t("product.next")}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* See All Products Button */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={handleProductClick}
          className="w-full max-w-xs mx-auto bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition font-medium shadow-md"
        >
          {isLoggedIn ? t("home.seeAllProducts") : t("home.seeAllProducts")}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Home;