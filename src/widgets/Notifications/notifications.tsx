"use client";

import { useEffect, useRef, useState } from "react";

import { nanoid } from "nanoid";

import type { NotificationArgs } from "./types";

import { Item } from "./_components";
import { notificationsEventManager } from "./notifications-event-manager";

import style from "./notifications.module.scss";

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Array<NotificationArgs>>(
    []
  );

  const timeoutsRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const timeouts = timeoutsRef.current;

    const remove = (id: string) => {
      clearTimeout(timeouts.get(id));
      timeouts.delete(id);

      setNotifications((prev) => prev.filter((item) => item.id !== id));
    };

    const clearAll = () => {
      timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
      timeouts.clear();
    };

    const unsubscribeShow = notificationsEventManager.onShow(
      ({ id = nanoid(), timeout = 7000, ...rest }: NotificationArgs) => {
        setNotifications((prev) => [
          ...prev.filter((item) => item.id !== id),
          { id, ...rest }
        ]);

        clearTimeout(timeouts.get(id));

        if (timeout) {
          // таймеры очищаются в cleanup через clearAll (Map), правило этого не видит
          // eslint-disable-next-line @eslint-react/web-api-no-leaked-timeout
          const timeoutId = setTimeout(() => remove(id), timeout);

          timeouts.set(id, timeoutId);
        }
      }
    );

    const unsubscribeHide = notificationsEventManager.onHide(remove);

    const unsubscribeHideAll = notificationsEventManager.onHideAll(() => {
      clearAll();
      setNotifications([]);
    });

    return () => {
      unsubscribeShow();
      unsubscribeHide();
      unsubscribeHideAll();
      clearAll();
    };
  }, []);

  return (
    <div className={style.list}>
      {notifications.slice(-3).map(({ id, ...rest }) => (
        <Item key={id} {...rest} />
      ))}
    </div>
  );
};
