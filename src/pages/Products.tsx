import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Products: React.FC = () => {
  const { t } = useTranslation();

  const products = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    name: `Mahsulot ${i + 1}`,
    price: `${(i + 1) * 10} 000 So'm`,
    image: `https://files.glamourboutique.uz/products/024art09.300x450.JPG`,
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{t("product.all_products")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="border border-[#b7b7b7] rounded-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105 bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
            <p className="text-green-500 font-semibold">{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
