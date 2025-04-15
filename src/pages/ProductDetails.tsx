import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { RootState } from "../store/store";
import axios from "axios";
import { formatPrice } from "../utils/formatPrice";
import { Product } from "../api/productsApi";
import { toast } from "react-toastify";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === Number(id))
  );

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`https://srvr.bordoshoes.uz/products/${id}`);
        setProduct(response.data);
        if (response.data.image_url.length > 0) {
          setSelectedImage(response.data.image_url[0]);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]);

  // Komponent yuklanganda, agar savatda mahsulot bo'lsa, uning size ni o'rnatamiz
  useEffect(() => {
    if (cartItem && cartItem.size) {
      setSelectedSize(cartItem.size);
    }
  }, [cartItem]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.size && product.size.length > 0 && !selectedSize) {
      toast.error("Iltimos, o'lchamni tanlang");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        size: selectedSize || undefined,
      })
    );
    toast.success("Mahsulot savatga qo'shildi");
  };

  const handleIncrement = () => {
    if (!cartItem) return;
    
    dispatch(
      addToCart({
        id: cartItem.id,
        title: cartItem.title,
        price: cartItem.price,
        quantity: 1,
        size: cartItem.size || undefined,
      })
    );
  };

  const handleDecrement = () => {
    if (!cartItem) return;
    
    if (cartItem.quantity > 1) {
      dispatch(
        addToCart({
          id: cartItem.id,
          title: cartItem.title,
          price: cartItem.price,
          quantity: -1,
          size: cartItem.size || undefined,
        })
      );
    } else {
      dispatch(removeFromCart(cartItem.id));
      toast.info("Mahsulot savatdan olib tashlandi");
    }
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="md:w-[60%] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Images */}
        <div className="">
          <div className="relative mb-4">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-[400px] object-contain rounded-md mb-4"
            />
          </div>
          <div className="lg:m-12 m-5 flex space-x-4 overflow-x-auto">
            {product?.image_url?.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(image)}
                className={`w-16 h-16 object-contain rounded-md cursor-pointer border ${selectedImage === image ? "border-green-500" : "border-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>
        {/* Product Details */}
        <div className="px-5">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <p className="text-green-500 text-lg font-semibold mb-4">
            {formatPrice(String(product.price))} So'm
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Color Selection */}
          {/* <div className="mb-4">
            <h3 className="text-base font-bold mb-2">Rangi</h3>
            <div className="flex space-x-4">
              {product?.colors?.map((color: any) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === color
                    ? "border-green-500"
                    : "border-gray-300"
                    }`}
                  style={{
                    backgroundColor: color.toLowerCase(),
                  }}
                ></button>
              ))}
            </div>
          </div> */}

          {/* Size Selection */}
          {product.size && product.size.length > 0 && (
            <div className="mb-4">
              <h3 className="text-base font-bold mb-2">Razmer</h3>
              <div className="flex flex-wrap gap-2">
                {product.size.map((size: number) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${selectedSize === size
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-700 border-gray-300"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-red-500 text-sm mt-1">Iltimos, o'lchamni tanlang</p>
              )}
            </div>
          )}

          {/* Add to Cart or Increment/Decrement Buttons */}
          {cartItem ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleDecrement}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
              >
                -
              </button>
              <span className="text-lg font-bold">{cartItem.quantity}</span>
              <button
                onClick={handleIncrement}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
            >
              Savatga qo'shish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
