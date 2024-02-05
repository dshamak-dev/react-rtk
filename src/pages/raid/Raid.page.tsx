import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shopSelector } from "src/store/shop.store";
import { Scene } from "src/components/molecules/Scene";
import { getRaid } from "src/pages/lobby/lobby.api";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { dateDifference, timeToDateText } from "src/support/time.support";
import { ResourceIcon } from "src/components/atoms/ResourceIcon";

export const RaidPage = ({ id }) => {
  const dispatch = useDispatch();
  const [raid, setRaid] = useState(null);

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

    const { name, bgImageUrl, previewImageUrl, endDate, resources = [] } = raid;
    const timeLeft = timeToDateText(dateDifference(Date.now(), endDate));

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
            "flex flex-col items-center gap-2",
            "p-4 bg-black/40"
          )}
        >
          <div className="flex flex-col items-center text-center">
            <h2 data-id={id} className="uppercase text-3xl text-shadow">
              {name}
            </h2>
            <p
              className={classNames(
                "flex items-center gap-2",
                "w-fit px-2 py-1 rounded-xl",
                "text-xs bg-highlight text-black bg-default bg-opacity-80"
              )}
            >
              <span className="text-xs">
                <FontAwesomeIcon icon={faHourglassHalf} />
              </span>
              <span>{timeLeft || "ENDED"}</span>
            </p>
          </div>
          <div className={classNames("py-2", "text-center")}>levels</div>
          {resources ? (
            <div className="flex gap-2 px-2 py-1 bg-white/80 text-black rounded-md items-center">
              <span className="capitalize">award:</span>
              {resources.map((it) => (
                <div key={it.type} className="flex gap-1 items-center">
                  <span>{it.value}</span>
                  <ResourceIcon type={it.type} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }, [raid]);

  return <Scene name="raid">{content}</Scene>;
};
