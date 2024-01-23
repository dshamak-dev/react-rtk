import React from 'react';
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

const links = [
  {
    href: "/shop",
    text: "shop",
  },
  {
    href: "/battle",
    text: "battle",
  },
  {
    href: "/camp",
    text: "camp",
  },
];

export function Navigation() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed -bottom-4 z-10 w-full flex gap-8 justify-center">
      {links.map(({ href, text }, index) => {
        const isActive = pathname === href;

        return (
          <Link
            key={index}
            to={href}
            className={classNames("relative px-8 py-4", {
              "-top-4 bg-sky-500": isActive,
              "bg-black text-white": !isActive,
            })}
          >
            {text}
          </Link>
        );
      })}
    </nav>
  );
}
