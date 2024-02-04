import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shopSelector } from "src/store/shop.store";
import { Scene } from "src/components/molecules/Scene";

export const CampPage = () => {
  const dispatch = useDispatch();
  const [showSell, setShowSell] = useState(false);
  const shop = useSelector(shopSelector);

  return (
    <Scene name="camp">{null}</Scene>
  );
}
