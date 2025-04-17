// src/components/common/Button.tsx

import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  className = "",
}) => {
  return (
    <div className="w-full flex justify-end">
      <button
        type={type}
        onClick={onClick}
        className={`w-40 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
