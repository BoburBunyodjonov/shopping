import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { IProductProps } from "../api/productsApi";
import { post } from "../api/apiClient";
import { useQuery } from "@tanstack/react-query";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const { t } = useTranslation();

  const [page, setPage] = useState(1); // State for current page
  const take = 16; // Number of products per page

  const fetchFilteredProducts = async (): Promise<IProductProps> => {
    return await post<IProductProps>(`/products/filter?page=${page}&take=${take}`, { take, page }); // Send `take` and `page` in the body
  };

  const { data: products, isLoading } = useQuery<IProductProps, Error>({
    queryKey: ["products/filter", page, take],
    queryFn: fetchFilteredProducts,
    staleTime: 5000,
  });

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }

  const openModal = (productName: string) => {
    setSelectedProduct(productName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
            onClick={() => openModal(product.title)}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={product.image_url[0]}
              alt={product.title}
              className="w-full object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
            {/* <p className="text-green-500 font-semibold">{product.price}</p> */}
          </motion.div>
        ))}
      </motion.div>

      <div className="flex items-center justify-end mt-6 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition duration-300"
        >
          {t("product.previous")}
        </button>

        <span className="text-lg font-medium text-gray-700">
          {t("product.page")} <span className="font-bold">{page}</span>
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * take >= (products?.total || 0)}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition duration-300"
        >
          {t("product.next")}
        </button>
      </div>

      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/products"
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition"
        >
          {t("home.seeAllProducts")}
        </Link>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">Order {selectedProduct}</h2>
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
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  placeholder="Enter your location"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Home;
