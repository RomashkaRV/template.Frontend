import type { ItemProps } from "./_components";

export type NotificationArgs = ItemProps & {
  id: string;
  timeout?: number;
};

export type NotificationEventManagerCallback<T = unknown> = {
  (data: T): void;
};

export type NotificationEventManagerEvent = "show" | "hide" | "hideAll";

export type NotificationEventManager = Record<
  NotificationEventManagerEvent,
  Array<NotificationEventManagerCallback>
>;
