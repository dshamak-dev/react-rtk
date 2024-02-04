import React, { PropsWithChildren } from "react";
import classNames from "classnames";

export interface ButtonProps extends PropsWithChildren<any> {}

export const Button: React.FC<ButtonProps> = ({ children, className = null, ...other }) => {
  return (
    <button
      {...other}
      className={classNames(
        "border bg-sky-500 px-12 py-4 rounded uppercase",
        className
      )}
    >
      {children}
    </button>
  );
};
