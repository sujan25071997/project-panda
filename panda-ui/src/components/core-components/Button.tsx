// src/components/common/Button.tsx

import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  className = "",
  disabled,
}) => {
  const baseStyles =
    "w-40 text-white py-2 px-4 rounded-md transition duration-300";
  const enabledStyles = "bg-emerald-600 hover:bg-emerald-700 cursor-pointer";
  const disabledStyles = "bg-gray-400 cursor-not-allowed";

  return (
    <div className="w-full flex justify-end">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${
          disabled ? disabledStyles : enabledStyles
        } ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
