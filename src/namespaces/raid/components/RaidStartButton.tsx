import React, { useMemo, useState } from "react";
import { handleNavigate } from "src/app/AppRouter";
import { Button } from "src/components/Button";
import { ClaimResourcesButton } from "src/components/molecules/ClaimResourcesButton";
import { PaymentButton } from "src/components/molecules/PaymentButton";
import { ILevel } from "src/namespaces/level/level.model";
import { deleteRaid } from "src/namespaces/raid/raid.api";
import { postSession } from "src/namespaces/session/session.api";
import { deleteUserResources } from "src/namespaces/user/user.api";
import { addTime, isDateAfter, isDateBefore } from "src/support/time.support";

export const RaidStartButton = ({ raid }) => {
  const [busy, setBusy] = useState(false);

  const isClosed = useMemo(() => {
    const now = Date.now();
    const hasStarted = isDateBefore(raid.startDate, now);
    const hasEnded = isDateAfter(now, raid.endDate);

    return !hasStarted || hasEnded;
  }, [raid.startDate, raid.endDate]);

  const nextLevel: ILevel = useMemo(() => {
    const incomplete = raid.levels?.find((it) => {
      return !it.completed;
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

    await deleteRaid(raid.id);
    setBusy(false);

    handleNavigate('lobby');
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

  const handleNavigateLevel = async () => {
    const session = await postSession(nextLevel);

    if (!session) {
      return;
    }

    await deleteUserResources(nextLevel.cost);

    handleNavigate("session", { id: session.id });
  };

  return (
    <PaymentButton resources={nextLevel.cost} onSubmit={handleNavigateLevel}>
      Start
    </PaymentButton>
  );
};
