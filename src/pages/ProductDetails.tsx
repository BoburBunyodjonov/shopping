import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { RootState } from "../store/store";
import axios from "axios";
import { formatPrice } from "../utils/formatPrice";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === Number(id))
  );

  const [product, setProduct] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<string>("Red");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Fetch product data from the API
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://srvr.bordoshoes.uz/products/${id}`);
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

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        })
      );
    }
  };

  const handleIncrement = () => {
    if (cartItem) {
      dispatch(
        addToCart({
          id: cartItem.id,
          name: cartItem.name,
          price: cartItem.price,
          quantity: 1,
        })
      );
    }
  };

  const handleDecrement = () => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(
        addToCart({
          id: cartItem.id,
          name: cartItem.name,
          price: cartItem.price,
          quantity: -1,
        })
      );
    } else if (cartItem) {
      dispatch(removeFromCart(cartItem.id));
    }
  };

  if (!product) {
    return <div>Loading...</div>; // Loading state while waiting for API response
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Images */}
        <div>
          <div className="relative w-full h-[400px] mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex space-x-4">
            {product.image_url.map((image: any, index: any) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(image)}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border ${selectedImage === image ? "border-green-500" : "border-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-gray-700 mb-4 font-extrabold">{product.title}</h1>

          <p className="text-green-500 text-lg font-semibold mb-4">
            {formatPrice(product.price)} So'm
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-4">
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
          </div>

          {/* Size Selection */}
          <div className="mb-4">
            <h3 className="text-base font-bold mb-2">Razmer</h3>
            <div className="flex space-x-4">
              {product?.sizes?.map((size: any) => (
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
          </div>

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
