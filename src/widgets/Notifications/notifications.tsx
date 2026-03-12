"use client";

import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

import type { NotificationArgs } from "./types";

import { Item } from "./_components";
import { notificationsEventManager } from "./notifications-event-manager";
import style from "./notifications.module.scss";

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Array<NotificationArgs>>(
    []
  );

  const [timeouts, setTimeouts] = useState<
    Record<string, ReturnType<typeof setTimeout>>
  >({});

  const handleClose = (id: string) => {
    clearTimeout(timeouts[id]);

    setTimeouts((prevTimeouts) => {
      const newTimeouts = { ...prevTimeouts };

      delete newTimeouts[id];

      return newTimeouts;
    });

    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  useEffect(() => {
    notificationsEventManager.onShow(
      ({ id = nanoid(), timeout = 7000, ...rest }: NotificationArgs) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          { id, ...rest }
        ]);

        if (timeout) {
          setTimeouts((prevIds) => ({
            ...prevIds,
            [id]: setTimeout(() => {
              handleClose(id);
            }, timeout)
          }));
        }
      }
    );

    notificationsEventManager.onHide((id: string) => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notice) => notice.id !== id)
      );
    });

    notificationsEventManager.onHideAll(() => {
      // Очищаем все таймауты
      Object.values(timeouts).forEach(clearTimeout);
      setTimeouts({});

      // Очищаем все уведомления
      setNotifications([]);
    });
  }, []);

  return (
    <div className={style.list}>
      {notifications.slice(-3).map(({ id, ...rest }) => (
        <Item key={id} {...rest} />
      ))}
    </div>
  );
};
