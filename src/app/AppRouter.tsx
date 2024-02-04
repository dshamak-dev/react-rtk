import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   RouterProvider,
//   createBrowserRouter,
//   redirect,
// } from "react-router-dom";
import Battle from "src/pages/battle/Battle.page";
import { CampPage } from "src/pages/camp/page";
import ItemsPage from "src/pages/items/Items.page";
import { LobbyPage } from "src/pages/lobby/Lobby.page";
import Shop from "src/pages/shop/Shop.page";
import {
  selector as appSelector,
  actions as appActions,
} from "src/store/app.store";
import { preventBrowserHistory } from "src/support/browser.support";

export type AppRouteType = "items" | "battle" | "lobby" | "camp" | "shop";

export const navLinks: { text: string; href: AppRouteType }[] = [
  {
    text: "camp",
    href: "camp",
  },
  {
    text: "items",
    href: "items",
  },
  {
    text: "shop",
    href: "shop",
  },
  {
    text: "lobby",
    href: "lobby",
  },
];
const navigateEventName = "navigateTo";

export const handleNavigate = (pathname: AppRouteType) => {
  const event = new CustomEvent(navigateEventName, {
    detail: {
      pathname,
    },
  });

  document.dispatchEvent(event);
};

export const AppRouter = () => {
  const { pathname } = useSelector(appSelector);
  const dispatch = useDispatch();

  const navigateTo = (path) => {
    dispatch(appActions.navigateTo(path));
  };

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const _path = e.detail?.pathname;

      if (_path) {
        navigateTo(_path);
      }
    };

    const _key = Date.now();

    document.addEventListener(navigateEventName, handler);

    preventBrowserHistory();

    return () => {
      document?.removeEventListener(navigateEventName, handler);
    };
  }, [dispatch]);

  switch (pathname) {
    case "battle": {
      return <Battle />;
    }
    case "lobby": {
      return <LobbyPage />;
    }
    case "items": {
      return <ItemsPage />;
    }
    case "shop": {
      return <Shop />;
    }
    case "camp": {
      return <CampPage />;
    }
    default: {
      navigateTo("camp");
      return null;
    }
  }
};
