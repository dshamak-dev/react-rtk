import React from "react";
import { handleNavigate } from "src/app/AppRouter";

export const AppLink = ({ to, children, ...other }) => {
  return (
    <a {...other} onClick={() => handleNavigate(to)}>
      {children}
    </a>
  );
};
