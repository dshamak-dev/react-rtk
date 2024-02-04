import classNames from "classnames";
import React from "react";
import { handleNavigate } from "src/app/AppRouter";

export const AppLink = ({ to, children, className = null, ...other }) => {
  return (
    <a
      {...other}
      className={classNames("cursor-pointer select-none", className)}
      onClick={() => handleNavigate(to)}
    >
      {children}
    </a>
  );
};
