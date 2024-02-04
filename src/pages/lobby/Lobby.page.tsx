import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Scene } from "src/components/molecules/Scene";
import { getRaids } from "src/pages/lobby/lobby.api";
import {
  selector as lobbySelector,
  actions as lobbyActions,
} from "./lobby.store";
import { RaidList } from "src/components/molecules/RaidList";

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
