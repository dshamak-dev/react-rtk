import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Scene } from "src/components/molecules/Scene";
import {
  selector as lobbySelector,
  actions as lobbyActions,
} from "./lobby.store";
import { RaidList } from "src/components/molecules/RaidList";
import { getRaids } from "src/namespaces/raid/raid.api";

export const LobbyPage = () => {
  const dispatch = useDispatch();
  const lobby = useSelector(lobbySelector);

  const handleSync = async () => {
    const data = await getRaids();

    dispatch(lobbyActions.set({ items: data }));
  };

  useEffect(() => {
    handleSync();
  }, []);

  return (
    <Scene name="lobby">
      <RaidList items={lobby?.items || []} />
    </Scene>
  );
};
