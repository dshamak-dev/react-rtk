import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   RouterProvider,
//   createBrowserRouter,
//   redirect,
// } from "react-router-dom";
import Battle from "src/pages/battle/Battle.page";
import Camp from "src/pages/camp/page";
import Shop from "src/pages/shop/Shop.page";
import {
  selector as appSelector,
  actions as appActions,
} from "src/store/app.store";
import { preventBrowserHistory } from "src/support/browser.support";

export type AppRouteType = "battle" | "lobby" | "camp" | "shop";

// const routers = createBrowserRouter([
//   {
//     path: "/",
//     loader: async () => {
//       return redirect("/battle");
//     },
//   },
//   {
//     path: "/shop",
//     element: <Shop />,
//   },
//   {
//     path: "/camp",
//     element: <Camp />,
//   },
//   {
//     path: "/battle",
//     element: <Battle />,
//   },
// ]);
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

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const _path = e.detail?.pathname;

      if (_path) {
        dispatch(appActions.navigateTo(_path));
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
    case "shop": {
      return <Shop />;
    }
    case "camp":
    default: {
      return <Camp />;
    }
  }

  // return <RouterProvider router={routers} />;
};
