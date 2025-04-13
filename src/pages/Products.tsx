import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { post } from "../api/apiClient";
import { IProductProps, Product } from "../api/productsApi";
import { formatPrice } from "../utils/formatPrice";
import { useDebounce } from "../hooks/useDebounce";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

const categories = [
  { label: "Bahor", value: 1 },
  { label: "Yoz", value: 2 },
  { label: "Kuz", value: 3 },
  { label: "Qish", value: 4 },
];

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const take = 10;

  const [titleSearch, setTitleSearch] = useState("");
  const [codeSearch, setCodeSearch] = useState("");
  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  const debouncedTitle = useDebounce(titleSearch, 500);
  const debouncedCode = useDebounce(codeSearch, 500);

  const fetchFilteredProducts = async (): Promise<IProductProps> => {
    return await post<IProductProps>(`/products/filter?page=${page}&take=${take}`, {
      take,
      page,
      title: debouncedTitle,
      code: debouncedCode,
      category_id: categoryIds,
    });
  };

  const { data: products, isLoading } = useQuery<IProductProps, Error>({
    queryKey: ["products/filter", page, take, debouncedTitle, debouncedCode, categoryIds],
    queryFn: fetchFilteredProducts,
    staleTime: 5000,
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{t("product.all_products")}</h1>

      {/* 🔍 Filters with MUI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <TextField
          label={t("product.search_title") || "Search by title"}
          variant="outlined"
          value={titleSearch}
          onChange={(e) => setTitleSearch(e.target.value)}
        />
        <TextField
          label={t("product.search_code") || "Search by code"}
          variant="outlined"
          value={codeSearch}
          onChange={(e) => setCodeSearch(e.target.value)}
        />
        <FormControl>
          <InputLabel>{t("product.filter_category") || "Filter by Category"}</InputLabel>
          <Select
            multiple
            value={categoryIds}
            onChange={(e) => setCategoryIds(e.target.value as number[])}
            input={<OutlinedInput label="Filter by Category" />}
            renderValue={(selected) =>
              categories
                .filter((cat) => selected.includes(cat.value))
                .map((cat) => cat.label)
                .join(", ")
            }
          >
            {categories.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                <Checkbox checked={categoryIds.includes(cat.value)} />
                <ListItemText primary={cat.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* 🛒 Product List */}
      {isLoading ? (
        <div className=" flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {
            products?.data.map((product: Product) => (
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
                <p className="text-green-500 font-semibold">
                  {formatPrice(String(product.price))} So'm
                </p>
              </Link>
            ))
          }
        </div>
        )}
      

      {/* 📄 Pagination */}
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
