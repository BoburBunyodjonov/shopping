import React, { useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";

const GlobalLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // Simulate global loading
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <PuffLoader color="#10B981" size={60} />
      </div>
    );
  }

  return <>{children}</>;
};

export default GlobalLoader;
