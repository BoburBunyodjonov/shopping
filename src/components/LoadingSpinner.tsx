import React from "react";
import { PuffLoader } from "react-spinners";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <PuffLoader color="#10B981" size={60} />
    </div>
  );
};

export default LoadingSpinner;
