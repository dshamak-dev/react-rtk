import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Scene } from "src/components/molecules/Scene";
import classNames from "classnames";
import { Duration } from "src/components/atoms/Duration";
import { AwardPreview } from "src/components/molecules/AwardPreview";
import { LevelCard } from "src/namespaces/level/components/LevelCard";
import { RaidStartButton } from "src/namespaces/raid/components/RaidStartButton";
import { getRaid } from "src/namespaces/raid/raid.api";

export const RaidPage = ({ id }) => {
  const dispatch = useDispatch();
  const [raid, setRaid] = useState(null);

  const {
    name,
    bgImageUrl,
    previewImageUrl,
    endDate,
    resources = [],
    levels = [],
  } = raid || {};

  const handleLoad = async () => {
    if (!id) {
      return;
    }

    const data = await getRaid(id);
    setRaid(data);
  };

  useEffect(() => {
    handleLoad();
  }, [id]);

  const content = useMemo(() => {
    if (!raid) {
      return <div>no raid found</div>;
    }

    const nextLevelIndex = raid.levels.findIndex((it) => {
      return !it.claimed;
    });

    return (
      <div
        className={classNames(
          "relative h-full",
          "flex flex-col bg-black/20 p-4 px-8 pt-32 z-0 border-2 border-black/20"
        )}
        data-id={id}
      >
        <div
          className={classNames(
            "absolute left-0 top-0 z-0",
            "w-full h-full",
            "pointer-events-none"
          )}
        >
          <div
            className={classNames(
              "absolute left-0 top-0 z-0",
              "w-full h-full opacity-20 bg-contain",
              "pointer-events-none"
            )}
            style={{
              backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : null,
            }}
          ></div>
          <div
            className={classNames(
              "absolute left-0 top-16 bottom-0 z-10",
              "w-full bg-no-repeat bg-[center_bottom] bg-contain",
              "pointer-events-none"
            )}
            style={{
              backgroundImage: previewImageUrl
                ? `url(${previewImageUrl})`
                : null,
            }}
          ></div>
        </div>
        <div
          className={classNames(
            "relative z-10",
            "flex flex-col items-center gap-4",
            "p-4 bg-black/40"
          )}
        >
          <div className="flex flex-col items-center text-center">
            <Duration start={null} end={endDate} />
            <h2 data-id={id} className="uppercase text-3xl text-shadow">
              {name}
            </h2>
          </div>
          {resources ? <AwardPreview resources={resources} /> : null}
          {levels?.length ? (
            <div className={classNames("flex items-center gap-4", "py-2", "text-center")}>
              {levels.map((it, index) => {
                const isActive = index === nextLevelIndex;

                return <LevelCard key={it.id || index} level={it} active={isActive}  />;
              })}
            </div>
          ) : null}
          <RaidStartButton raid={raid} />
        </div>
      </div>
    );
  }, [raid]);

  return <Scene name="raid">{content}</Scene>;
};
