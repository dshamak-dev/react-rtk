import React, { PropsWithChildren, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonProps } from "src/components/Button";
import { IResource } from "src/models/resource.model";
import { postUserResources } from "src/namespaces/user/user.api";
import {
  actions as userActions,
  userCoinsSelector,
  selector as userSelector,
} from "src/namespaces/user/user.store";

interface Props extends ButtonProps {
  resources: IResource[];
  onSubmit?: () => void;
}

export const ClaimResourcesButton: React.FC<Props> = ({
  resources,
  children,
  onSubmit,
  ...other
}) => {
  const dispatch = useDispatch();

  const handleRequst = async (resources: IResource[]) => {
    const updatedUser = await postUserResources(resources);

    dispatch(userActions.set(updatedUser));

    if (onSubmit) {
      onSubmit();
    }
  };

  const handleClick = useCallback(() => {
    handleRequst(resources);
  }, [handleRequst, resources]);

  return (
    <Button {...other} onClick={handleClick}>
      {children}
    </Button>
  );
};
