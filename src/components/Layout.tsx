import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Carousel from "./Carousel";
import Map from "./Map";
import { AuthProvider } from "../AuthContext";

const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <AuthProvider>
        <Navbar logoText="Bordo" cartCount={0} />
        {/* Render Carousel only on the Home page */}
        {location.pathname === "/" && <Carousel />}
        <main className="p-4">
          <Outlet />
        </main>
        {location.pathname === "/" && <Map />}
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default Layout;
