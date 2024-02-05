import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useCallback, useMemo } from "react";
import { handleNavigate } from "src/app/AppRouter";
import { ResourceIcon } from "src/components/atoms/ResourceIcon";
import { IRaid } from "src/models/raid.model";
import { dateDifference, timeToDateText } from "src/support/time.support";

interface Props {
  raid: IRaid;
}

export const RaidPreview: React.FC<Props> = ({ raid }) => {
  if (!raid) {
    return null;
  }
  const {
    id,
    type,
    name,
    startDate,
    endDate,
    resources,
    bgImageUrl,
    previewImageUrl,
    levels,
  } = raid;

  const raidIcon = useMemo(() => {
    let icon = null;

    if (!icon) {
      return null;
    }

    return <FontAwesomeIcon icon={icon} />;
  }, [type]);

  const timeLeft = useMemo(() => {
    const diff = dateDifference(Date.now(), endDate);
    return timeToDateText(diff);
  }, [startDate, endDate]);

  const handleClick = useCallback(() => {
    if (!timeLeft) {
      return;
    }

    handleNavigate(`raid`, { id });
  }, [id, timeLeft]);

  return (
    <div
      className={classNames(
        "relative flex flex-col bg-black/20 p-4 pt-32 z-0 border-2 border-black/20",
        "opacity-50 hover:opacity-100"
      )}
      data-id={id}
      onClick={handleClick}
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
          style={{ backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : null }}
        ></div>
        <div
          className={classNames(
            "absolute left-0 top-16 bottom-0 z-10",
            "w-full bg-no-repeat bg-[center_bottom] bg-contain",
            "pointer-events-none"
          )}
          style={{
            backgroundImage: previewImageUrl ? `url(${previewImageUrl})` : null,
          }}
        ></div>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="text-center">
          <h4 data-id={id} className="text-xs">
            {raidIcon}
          </h4>
          <p
            className={classNames(
              "flex items-center gap-2",
              "px-2 py-1 rounded-xl",
              "text-xs bg-highlight text-black bg-default bg-opacity-80"
            )}
          >
            <span className="text-xs">
              <FontAwesomeIcon icon={faHourglassHalf} />
            </span>
            <span>{timeLeft || "ENDED"}</span>
          </p>
        </div>
        <h2 data-id={id} className="uppercase text-3xl text-shadow">
          {name}
        </h2>
        {resources ? (
          <div className="flex gap-4 px-2 py-1 bg-white/80 text-black rounded-md items-center">
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
};
