import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

    const products = Array.from({ length: 16 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: `$${(i + 1) * 10}`,
        image: "https://media.wired.com/photos/6508bcf4f60ed7f4e17ab7d0/1:1/w_150%2Cc_limit/iPhone-15-Review-Featured-Gear.jpg",
    }));

    const openModal = (productName: string) => {
        setSelectedProduct(productName);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="p-6">
            {/* About Section */}
            <div className="mb-12 bg-gray-100 p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">About ShopEasy</h2>
                <p className="text-gray-700">
                    ShopEasy is your one-stop destination for all your shopping needs. We
                    provide a wide range of high-quality products at unbeatable prices.
                    Our mission is to make shopping easy, convenient, and enjoyable for
                    everyone. Join us and experience the joy of hassle-free shopping!
                </p>
            </div>

            <h1 className="text-3xl font-bold mb-6">Welcome to ShopEasy!</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 hover:shadow-xl cursor-pointer transition-transform transform hover:scale-105 bg-white"
                        onClick={() => openModal(product.name)}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                        <p className="text-green-500 font-semibold">{product.price}</p>
                    </div>
                ))}
            </div>
            <div className="mt-6 text-center">
                <Link
                    to="/products"
                    className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition"
                >
                    See All Products
                </Link>
            </div>


            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
                                <label className="block text-sm font-medium mb-1">
                                    Location
                                </label>
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
