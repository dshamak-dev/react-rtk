import React, { PropsWithChildren } from "react";
import classNames from "classnames";

export interface ButtonProps extends PropsWithChildren<any> {}

export const Button: React.FC<ButtonProps> = ({ children, className = null, ...other }) => {
  return (
    <button
      {...other}
      className={classNames(
        "bg-highlight px-8 py-2 rounded uppercase",
        className
      )}
    >
      {children}
    </button>
  );
};
