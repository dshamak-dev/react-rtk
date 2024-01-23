import React, { useState } from "react";

export const PopupButton = ({ trigger, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setVisible((prev) => !prev)}>{trigger}</div>
      {visible ? <div className="absolute top-full">{children}</div> : null}
    </div>
  );
};
