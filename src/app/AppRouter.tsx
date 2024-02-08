import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   RouterProvider,
//   createBrowserRouter,
//   redirect,
// } from "react-router-dom";
import Battle from "src/pages/battle/Battle.page";
import { CampPage } from "src/pages/camp/Camp.page";
import ItemsPage from "src/pages/items/Items.page";
import { LobbyPage } from "src/pages/lobby/Lobby.page";
import Shop from "src/pages/shop/Shop.page";
import {
  selector as appSelector,
  actions as appActions,
} from "src/app/app.store";
import { preventBrowserHistory } from "src/support/browser.support";
import {
  faBriefcase,
  faCampground,
  faDungeon,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { RaidPage } from "src/pages/raid/Raid.page";
import { SessionPage } from "src/pages/session/Session.page";

export type AppRouteType =
  | "items"
  | "battle"
  | "lobby"
  | "raid"
  | "camp"
  | "session"
  | "shop";

export const navLinks: { text: string; href: AppRouteType; icon: IconProp }[] =
  [
    {
      text: "camp",
      href: "camp",
      icon: faCampground,
    },
    // {
    //   text: "items",
    //   href: "items",
    //   icon: faBriefcase,
    // },
    {
      text: "shop",
      href: "shop",
      icon: faStore,
    },
    {
      text: "lobby",
      href: "lobby",
      icon: faDungeon,
    },
  ];
const navigateEventName = "navigateTo";

export const handleNavigate = (pathname: AppRouteType, query?: Object) => {
  const event = new CustomEvent(navigateEventName, {
    detail: {
      pathname,
      query,
    },
  });

  document.dispatchEvent(event);
};

export const AppRouter = () => {
  const { pathname, query } = useSelector(appSelector);
  const dispatch = useDispatch();

  const navigateTo = (pathname, query) => {
    dispatch(appActions.navigateTo({ pathname, query }));
  };

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const _path = e.detail?.pathname;
      const _query = e.detail?.query;

      if (_path) {
        navigateTo(_path, _query);
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
    case "raid": {
      return <RaidPage id={query?.id} />;
    }
    case "session": {
      return <SessionPage id={query?.id} />;
    }
    default:
    case "camp": {
      return <CampPage />;
    }
  }
};
