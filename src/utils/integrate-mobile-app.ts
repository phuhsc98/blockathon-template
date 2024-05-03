export enum EventType {
  SEAT_MAP_SUBMIT = 'SEAT_MAP_SUBMIT',
  SEAT_MAP_VIEW = 'SEAT_MAP_VIEW',
  SEAT_MAP_BACK = 'SEAT_MAP_BACK',
  SEAT_MAP_INIT = 'SEAT_MAP_INIT',
}

export enum EventTypeListener {
  SEAT_MAP_INIT = 'SEAT_MAP_INIT',
  SEAT_MAP_UPDATE_LIST = 'SEAT_MAP_UPDATE_LIST',
  SEAT_MAP_VIEW_DETAIL = 'SEAT_MAP_VIEW_DETAIL',
}

interface IMessageEvent<T> {
  event_type: EventType;
  data?: T;
}

export function sendMessageToApp(data: IMessageEvent<unknown>) {
  if ('ReactNativeWebView' in window && window instanceof Window) {
    //!: Can't add d.ts like application
    //TODO: Find solution later
    // window.ReactNativeWebView?.postMessage(JSON.stringify(data));
    (window as any).ReactNativeWebView.postMessage(JSON.stringify(data));
  }
}

export function isJSON(data: any): boolean {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }

  return true;
}
