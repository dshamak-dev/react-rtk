import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Scene } from "src/components/molecules/Scene";
import classNames from "classnames";
import { findSession, updateSession } from "src/namespaces/session/session.api";
import { getLevelIcon } from "src/namespaces/level/level.support";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { handleNavigate } from "src/app/AppRouter";
import { Button } from "src/components/Button";
import Game from "src/namespaces/game/components/Game";
import { postUserResources } from "src/namespaces/user/user.api";
import { getRaid, updateRaidLevel } from "src/namespaces/raid/raid.api";
import { concatObjects } from "src/support/object.support";

export const SessionPage = ({ id }) => {
  const dispatch = useDispatch();
  const [session, setSession] = useState(null);

  const pageIcon = useMemo(() => {
    return getLevelIcon(session?.levelType);
  }, [session?.levelType]);

  const handleLoad = async () => {
    const _data = await findSession(id);

    if (_data) {
      setSession(_data);
    }
  };

  const handleBack = () => {
    handleNavigate("raid", { id: session.raidId });
  };

  const handleUpdate = async (payload) => {
    const _data = await updateSession(id, payload);

    if (!_data.completed) {
      return;
    }

    if (_data.claimed) {
      return handleBack();
    }

    const raid = await getRaid(_data.raidId);

    if (!raid) {
      return handleBack();
    }

    const level = raid.levels?.find((it) => it.id === _data.levelId);

    if (!level) {
      return handleBack();
    }

    await postUserResources(level.resources);

    await updateRaidLevel(
      _data.raidId,
      concatObjects(level, { claimed: true, completed: true })
    );

    handleBack();
  };

  const handleLeave = () => {
    if (session?.raidId) {
      return handleBack();
    }

    handleNavigate("lobby");
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    handleLoad();
  }, [id]);

  return (
    <Scene
      name={`session ${session?.levelType || ""}`}
      icon={pageIcon}
      navigation={false}
    >
      <div
        className={classNames("relative h-full", "flex flex-col", "bg-default")}
      >
        <Button
          className={classNames(
            "absolute right-0 top-0",
            "flex gap-2 items-center justify-center p-4"
          )}
          onClick={handleLeave}
        >
          <span>leave</span>
          <FontAwesomeIcon icon={faTimes} />
        </Button>

        <div
          className={classNames("h-full", "flex items-center justify-center")}
        >
          {session ? <Game session={session} onChange={handleUpdate} /> : null}
        </div>
      </div>
    </Scene>
  );
};
