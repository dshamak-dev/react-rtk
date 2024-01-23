import React, { useMemo, useState } from "react";
import { Header } from "src/components/Header";
import { useDispatch, useSelector } from "react-redux";
import { shopSelector } from "src/store/shop.store";
import { AppLink } from "src/components/AppLink";

export default function Shop() {
  const dispatch = useDispatch();
  const [showSell, setShowSell] = useState(false);
  const shop = useSelector(shopSelector);

  const handleSellItem = () => {
    // dispatch();
  };

  const content = useMemo(() => {
    const list = shop.items;

    if (!list?.length) {
      return (
        <div className="flex h-full items-center text-center">
          <h3>I will come back in 15 minutes.</h3>
        </div>
      );
    }

    return (
      <div>
        {/* <div className="flex gap-4 py-4">
          {[{ text: "buy" }, { text: "sell" }].map(({ text }, index) => {
            return <span className="flex px-4 py-2 upercase">{text}</span>;
          })}
        </div> */}
        <div>
          {list.map((it) => {
            return (
              <div className="flex gap-4">
                <span>{it.title}</span>
                <span>{it.price}</span>
                <span>{it.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [shop?.items]);

  return (
    <main className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center h-full text-center p-12">
        <div className="flex gap-4">
          <AppLink to="camp" className="underline">
            back to camp
          </AppLink>
          <AppLink to="battle" className="underline">
            explore
          </AppLink>
        </div>
        <div className="flex flex-col gap-4">{content}</div>
      </div>
    </main>
  );
}
