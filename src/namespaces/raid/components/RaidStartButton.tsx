import React, { useMemo, useState } from "react";
import { Button } from "src/components/Button";
import { ClaimResourcesButton } from "src/components/molecules/ClaimResourcesButton";
import { updateRaid } from "src/namespaces/raid/raid.api";
import { addTime, isDateAfter, isDateBefore } from "src/support/time.support";

export const RaidStartButton = ({ raid }) => {
  const [busy, setBusy] = useState(false);

  const isClosed = useMemo(() => {
    const now = Date.now();
    const hasStarted = isDateBefore(raid.startDate, now);
    const hasEnded = isDateAfter(now, raid.endDate);

    return !hasStarted || hasEnded;
  }, [raid.startDate, raid.endDate]);

  const nextLevel = useMemo(() => {
    const incomplete = raid.levels?.find((it) => {
      return !it.ready;
    });

    return incomplete;
  }, [raid.levels]);

  if (isClosed) {
    return (
      <div className="px-8 py-2 bg-secondary text-white uppercase">closed</div>
    );
  }

  const handleCloseRaid = async () => {
    setBusy(true);
    await updateRaid(raid.id, {
      startDate: raid.endDate,
      endDate: addTime(raid.endDate, { days: 1 }),
    });
    setBusy(false);
  };

  if (!nextLevel) {
    return (
      <ClaimResourcesButton
        resources={raid.resources}
        className="uppercase"
        onSubmit={handleCloseRaid}
      >
        claim reward
      </ClaimResourcesButton>
    );
  }

  return <Button>Start</Button>;
};
