import { ESeatStatus } from '../types';

export enum TOOLBAR_ACTION {
  POINTER = 'POINTER',
  DRAG = 'DRAG',
  ADD = 'ADD',
  ADD_NO_SEAT = 'ADD_NO_SEAT',
  DELETE = 'DELETE',
  ZOOM_IN = 'ZOOM_IN',
  ZOOM_OUT = 'ZOOM_OUT',
  GRID = 'GRID',
}
// TODO:
export enum DROPDOWN_ACTION {
  CREATE = 'CREATE',
}

export enum MANAGE_SEAT_ACTION {
  AREA = 'AREA',
  STATUS = 'STATUS',
}
export const MIN_SCALE_BY = 0.4;
export const SCALE_BY = 1.08;
export const MAX_SCALE_BY = 4;
export const GRID_SIZE = 16;
export const SIZE_SEAT = 16;
export const PADDING_SEAT = 1;
export const MINIMUM_BLOCK = SIZE_SEAT;

export const MINIMUM_SELECT_RECT = SIZE_SEAT / 2;

export const VISIBLE_SCALE_VALUE = 1;

export const DEFAULT_AREA_COLOR = 'rgba(38, 38, 38, 1)';

export enum ELEMENT_NAME {
  SEAT = 'seat',
  SEAT_ROW = 'seat_row',
  SEAT_BLOCK = 'seat_block',
}

export const PREVENT_CHANGE_STATUS = [
  ESeatStatus.SEAT_STATUS_SOLD,
  ESeatStatus.SEAT_STATUS_BOOKING,
];

export const SEAT_MAP_STATUS_LABEL = {
  [ESeatStatus.SEAT_STATUS_AVAILABLE]: 'Đang mở bán',
  [ESeatStatus.SEAT_STATUS_BOOKING]: 'Đang được chọn',
  [ESeatStatus.SEAT_STATUS_SOLD]: 'Đã bán',
  [ESeatStatus.SEAT_STATUS_LOCKED]: 'Đã khoá',
  [ESeatStatus.SEAT_STATUS_DISABLE]: 'Vô hiệu hoá',
} as const;
