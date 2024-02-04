import React, { useMemo } from "react";

import classNames from "classnames";
import { useSelector } from "react-redux";
import { selector as userSelector } from "src/namespaces/user/user.store";
import { Button } from "src/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { ItemCard } from "src/namespaces/item/ItemCard";
import { PopupButton } from "src/components/PopupButton";

const counters: { key: "coins" | "experience"; text: string }[] = [
  {
    key: "experience",
    text: "exp",
  },
  {
    key: "coins",
    text: "coins",
  },
];

export function Header() {
  const state = useSelector(userSelector);
  const itemsCount = useMemo(() => {
    return state?.items?.length || 0;
  }, [state?.items]);
  const items = useMemo(() => {
    return state?.items || [];
  }, [state?.items]);

  return (
    <header className="fixed top-0 left-0 z-10 w-full flex gap-8 justify-between p-2">
      <div>
        <PopupButton
          trigger={
            <Button className="!p-4">
              <FontAwesomeIcon icon={faBagShopping} />
              <span>({itemsCount})</span>
            </Button>
          }
        >
          <div className="flex flex-wrap justify-between p-4 bg-black rounded min-w-64">
            {items?.map((it, index) => {
              return (
                <ItemCard
                  key={index}
                  type={it.type}
                  number={it.number}
                  quality={it.quality}
                  icon={it.icon}
                />
              );
            })}
          </div>
        </PopupButton>
      </div>
      <div className="flex gap-8 justify-end">
        {counters.map(({ key, text }, index) => {
          const value = state[key];

          return (
            <div
              key={index}
              className={classNames("flex border border-white h-fit")}
            >
              <div className="py-2 px-4">{text}</div>
              <div className="text-black bg-white py-2 px-4">{value}</div>
            </div>
          );
        })}
      </div>
    </header>
  );
}
