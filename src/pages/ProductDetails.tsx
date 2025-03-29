import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { RootState } from "../store/store";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === Number(id))
  );

  const [selectedColor, setSelectedColor] = useState<string>("Red");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedImage, setSelectedImage] = useState<string>("");

  const product = {
    id: Number(id),
    name: `Product ${id}`,
    price: Number(id) * 10,
    description: "This is a detailed description of the product.",
    images: [
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f4bd7a6-f763-4518-9b81-bdfd40ce3fc9/d26yedh-7321e3e3-0846-4b77-b418-a30348f982f3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVmNGJkN2E2LWY3NjMtNDUxOC05YjgxLWJkZmQ0MGNlM2ZjOVwvZDI2eWVkaC03MzIxZTNlMy0wODQ2LTRiNzctYjQxOC1hMzAzNDhmOTgyZjMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.nvmUh7ZUbQgHUITE1Dhs97KzGb_gD2BjLiOiq73oMLY",
      "https://allroundclub.com/blog/wp-content/uploads/2021/10/how-to-draw-pikachu-150x150.png",
      "https://via.placeholder.com/400/00ff00",
      "https://via.placeholder.com/400/0000ff",
    ],
    colors: ["Red", "Green", "Blue"],
    sizes: ["S", "M", "L", "XL"],
  };

  // Dastlabki rasmni tanlash
  React.useEffect(() => {
    if (product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [id]); // ID o'zgarganda rasmni o'zgartirish

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Images */}
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <div className="flex space-x-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(image)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                  selectedImage === image ? "border-green-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <p className="text-green-500 text-lg font-semibold mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Select Color</h3>
            <div className="flex space-x-4">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
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
            <h3 className="text-lg font-bold mb-2">Select Size</h3>
            <div className="flex space-x-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
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
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
