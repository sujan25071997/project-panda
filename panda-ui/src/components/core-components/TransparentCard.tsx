import React from "react";
import classNames from "classnames";

interface TransparentCardProps {
  children: React.ReactNode;
  className?: string;
}

const TransparentCard: React.FC<TransparentCardProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        "bg-white/40 backdrop-brightness-40 rounded-2xl p-8 w-full h-full shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export default TransparentCard;
