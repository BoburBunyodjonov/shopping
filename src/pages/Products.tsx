import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { post } from "../api/apiClient";
import { IProductProps, Product } from "../api/productsApi";
import "react-toastify/dist/ReactToastify.css";
import { formatPrice } from "../utils/formatPrice";

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1); // State for current page
  const take = 10; // Number of products per page

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{t("product.all_products")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.data.map((product: Product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="border border-[#b7b7b7] rounded-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105 bg-white"
          >
            <img
              src={product.image_url[0]}
              alt={product.title}
              className="w-full object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
            <p className="text-green-500 font-semibold">{formatPrice(String(product.price))} So'm</p>
          </Link>
        ))}
      </div>
      {/* Pagination Controls */}
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

    </div>
  );
};

export default Products;
