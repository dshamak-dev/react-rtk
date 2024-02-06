import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shopSelector } from "src/store/shop.store";
import { Scene } from "src/components/molecules/Scene";
import classNames from "classnames";

export const CampPage = () => {
  const dispatch = useDispatch();
  const [showSell, setShowSell] = useState(false);
  const shop = useSelector(shopSelector);

  return (
    <Scene name="camp">
      <div className={classNames("relative h-full", "bg-black bg-no-repeat")}>
        <div
          className={classNames(
            "absolute top-0 left-0",
            "h-full w-full",
            "bg-cover bg-center"
          )}
          style={{
            backgroundImage: `url(https://i.pinimg.com/564x/29/41/a0/2941a0b3428a2167bfdb2c1dfe2d0356.jpg)`,
          }}
        ></div>
      </div>
    </Scene>
  );
};
