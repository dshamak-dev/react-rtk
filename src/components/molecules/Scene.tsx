import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBolt, faDragon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { ReactElement, ReactNode } from "react";
import { useSelector } from "react-redux";
import { AppRouteType, navLinks } from "src/app/AppRouter";
import { AppLink } from "src/components/AppLink";
import { ResourceIcon } from "src/components/atoms/ResourceIcon";
import { ResourceValue } from "src/components/atoms/ResourceValue";
import { selector as appSelector } from "src/store/app.store";
import { selector as userSelector } from "src/namespaces/user/user.store";

interface Props {
  name: string;
  navigation?: boolean;
  children: any;
  icon?: IconProp;
}

export const Scene: React.FC<Props> = ({
  name,
  children,
  navigation = true,
  icon,
}) => {
  const { pathname } = useSelector(appSelector);

  return (
    <div className="scene-wrap relative  h-screen overflow-hidden">
      <div className="h-full grid grid-rows-[auto_1fr]">
        <header className="relative z-20 flex justify-between items-center p-2">
          <div className="relative flex gap-4">
            <div className="header-icon">
              <div className="flag">
                <FontAwesomeIcon icon={icon || faDragon} />
              </div>
            </div>
            <div className="header-title flex items-center uppercase">
              {name}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <ResourceIcon type="energy" />
              <ResourceValue type="energy" />
            </div>
          </div>
        </header>
        <div className="h-full overflow-y-auto pb-16">{children}</div>
      </div>
      {navigation ? (
        <nav className="fixed bottom-0 left-0 w-full flex justify-center gap-8 items-end px-4">
          {navLinks.map((it, index) => {
            const isActive = pathname === it.href;

            return (
              <AppLink
                key={index}
                to={it.href}
                className={classNames("p-4", {
                  "bg-white text-black": isActive,
                  "bg-black text-white": !isActive,
                })}
              >
                {it.text}
              </AppLink>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
};
