export enum WSEventTypeListener {
  BLOCK_STATUS = 'BLOCK_STATUS',
  SEAT_STATUS = 'SEAT_STATUS',
}

export interface IWSMessageEvent<T> {
  eventType: WSEventTypeListener;
  data?: T;
}
