import React from "react";
import classNames from "classnames";

export const Button = ({ children, className = null, ...other }) => {
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
