import type {
  NotificationEventManagerCallback,
  NotificationEventManagerEvent,
  NotificationEventManager,
  NotificationArgs
} from "./types";

export const eventManager = {
  callbacks: {} as NotificationEventManager,

  on<T>(
    event: NotificationEventManagerEvent,
    callback: NotificationEventManagerCallback<T>
  ) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event].push(
      callback as NotificationEventManagerCallback<unknown>
    );
  },

  emit<T>(event: NotificationEventManagerEvent, data: T) {
    if (!this.callbacks[event]) return;

    this.callbacks[event].forEach((callback) => {
      callback(data);
    });
  }
};

export const notificationsEventManager = {
  show(data: Omit<NotificationArgs, "id"> & { id?: string }) {
    eventManager.emit("show", data);
  },

  onShow(callback: (data: NotificationArgs) => void) {
    eventManager.on("show", callback);
  },

  hide(id: string) {
    eventManager.emit("hide", id);
  },

  onHide(callback: (id: string) => void) {
    eventManager.on("hide", callback);
  },

  hideAll() {
    eventManager.emit("hideAll", null);
  },

  onHideAll(callback: () => void) {
    eventManager.on("hideAll", callback);
  }
};
