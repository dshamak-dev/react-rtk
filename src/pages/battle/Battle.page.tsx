import React, { useMemo } from "react";
import { Enemy } from "src/entities/enemy/Enemy";
import { Header } from "src/components/Header";
import { Button } from "src/components/Button";
import { ItemCard } from "src/entities/item/ItemCard";
import { AppLink } from "src/components/AppLink";
import { useDispatch, useSelector } from "react-redux";
import { createRandomEnemy } from "src/entities/enemy/enemy.factory";
import { actions as userActions } from "src/store/user.store";
import { battleActions, battleSelector } from "src/store/battle.store";

export default function Battle() {
  const { enemy } = useSelector(battleSelector);
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(battleActions.setEnemy(createRandomEnemy()));
  };

  const handleRemoveEnemy = () => {
    dispatch(battleActions.removeEnemy());
  };

  const handleClose = () => {
    handleRemoveEnemy();
  };

  const handleClaimItems = (selected = []) => {
    dispatch(userActions.addUserItems(selected));
    dispatch(battleActions.removeEnemyItems(selected));
  };
  const handleClaimAll = () => {
    handleClaimItems(enemy?.items);
    handleClose();
  };

  const content = useMemo(() => {
    if (!enemy) {
      return (
        <div>
          <div onClick={handleSearch}>
            <Button>explore</Button>
          </div>
          <AppLink to="camp">
            <Button>camp</Button>
          </AppLink>
        </div>
      );
    }

    const isAlive = enemy.health > 0;

    if (isAlive) {
      return (
        <Enemy />
      );
    }

    const { items = [] } = enemy;
    const hasItems = !!items?.length;

    return (
      <div className="flex flex-col gap-8 p-8 bg-sky-500">
        <div className="uppercase text-center text-2xl">rewards</div>
        {hasItems ? (
          <div>
            <b>Items</b>
            <div className="flex flex-wrap gap-4">
              {items?.map((it, index) => {
                return (
                  <ItemCard
                    key={index}
                    type={it.type}
                    number={it.number}
                    quality={it.quality}
                    icon={it.icon}
                    onClick={() => handleClaimItems([it])}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div>no items</div>
        )}
        <div className="flex gap-4">
          {hasItems ? (
            <Button className="bg-purple-500" onClick={() => handleClaimAll()}>
              claim all
            </Button>
          ) : null}
          <Button onClick={handleClose}>close</Button>
        </div>
      </div>
    );
  }, [enemy]);

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="h-screen flex items-center justify-center">
        {content}
      </div>
    </main>
  );
}
