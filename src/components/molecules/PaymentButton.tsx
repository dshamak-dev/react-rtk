import React, { useCallback } from "react";
import { Button } from "src/components/Button";
import { deleteUserResources } from "src/namespaces/user/user.api";

export function PaymentButton({ onSubmit, resources, ...props }) {
  const handleClick = useCallback(
    async (e) => {
      await deleteUserResources(resources);

      if (onSubmit) {
        onSubmit(e);
      }
    },
    [onSubmit]
  );

  return <Button {...props} onClick={handleClick} />;
}
