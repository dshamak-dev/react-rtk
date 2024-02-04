import React, { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

export const Loader: React.FC<PropsWithChildren<any>> = ({ className }) => {
  return (
    <div className={classNames(className, "relative")} title="loading..">
      <FontAwesomeIcon className="animate-rotation" icon={faSpinner} />
    </div>
  );
};
