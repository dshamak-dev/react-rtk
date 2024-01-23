import React, { useEffect, useMemo, useState } from "react";

export const Timer = ({ startAt, duration, onEnd }) => {
  const [trigger, setTrigger] = useState(null);
  const startTime = useMemo(() => {
    if (!startAt) {
      return 0;
    }

    const _d = new Date(startAt);

    return _d.getTime();
  }, [startAt]);

  const leftSec = useMemo(() => {
    if (!duration || !startTime) {
      return 0;
    }

    const now = Date.now();

    return Number(duration) - Math.floor((now - startTime) / 1000);
  }, [trigger, duration, startTime]);

  useEffect(() => {
    if (leftSec <= 0) {
      return;
    }

    const timer = setTimeout(() => setTrigger(Date.now()), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [leftSec]);

  useEffect(() => {
    if (leftSec <= 0 && onEnd) {
      onEnd();
    }
  }, [leftSec]);

  return (
    <div>
      <div className="progress">{leftSec} sec</div>
    </div>
  );
};
