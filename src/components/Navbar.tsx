import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface NavbarProps {
  logoText: string;
  cartCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ logoText, }) => {
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-semibold">
        <span className="text-green-500 italic">{logoText.slice(0, -3)}</span>
        <span className="text-black">{logoText.slice(-3)}</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link to="/products" className="text-gray-700 hover:text-green-500">
          Products
        </Link>
        <Link to="/register" className="text-gray-700 hover:text-green-500">
          Register
        </Link>
        <Link to="/login" className="text-gray-700 hover:text-green-500">
          Login
        </Link>
      </div>

      {/* Cart */}
      <div className="relative flex items-center text-gray-700 hover:text-green-500">
        <Link to="/cart" className="flex items-center">
          <ShoppingCartIcon fontSize="large" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
