import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRouter } from "src/app/AppRouter";
import { getApp, updateApp } from "src/app/app.api";
import { actions, selector } from "src/app/app.store";

export const App = () => {
  const state = useSelector(selector);

  const handleSave = async (payload) => {
    await updateApp(payload);
  };

  useEffect(() => {
    if (!state?.pathname) {
      return;
    }

    handleSave(state);
  }, [JSON.stringify(state)]);

  return (
    <React.Fragment>
      <AppRouter />
    </React.Fragment>
  );
};
