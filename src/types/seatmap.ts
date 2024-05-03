import {
  SeatBlock,
  SeatLine,
  Seat,
  Currency,
  Position,
  SeatStatus,
  SeatMap,
  SeatMapInfo,
  UpdateSeatStatusDetailReq,
  BlockStats,
  SeatStatusLog,
} from '@api/event/web_partnership/seat_map_pb';

export interface ISeatMapInfo extends SeatMapInfo.AsObject {
  //
}
export interface ISeatMap extends SeatMap.AsObject {
  //
}
export interface ISeatLine extends SeatLine.AsObject {
  //
}

export interface IPosition extends Position.AsObject {
  //
}

export interface ICurrency extends Currency.AsObject {
  //
}
export interface ISeatStatusLog extends SeatStatusLog.AsObject {
  //
}

export const ESeatStatus = {
  SEAT_STATUS_DISABLE: SeatStatus.SEAT_STATUS_DISABLE,
  SEAT_STATUS_AVAILABLE: SeatStatus.SEAT_STATUS_AVAILABLE,
  SEAT_STATUS_BOOKING: SeatStatus.SEAT_STATUS_BOOKING,
  SEAT_STATUS_LOCKED: SeatStatus.SEAT_STATUS_LOCKED,
  SEAT_STATUS_SOLD: SeatStatus.SEAT_STATUS_SOLD,
};

export interface ISeat extends Omit<Seat.AsObject, 'orderX' | 'orderY'> {
  orderX?: number;
  orderY?: number;
  log?: ISeatStatusLog;
}

export interface ISeatBlock
  extends Omit<
    SeatBlock.AsObject,
    | 'description' //
    | 'createdAt'
    | 'createdBy'
    | 'updatedAt'
    | 'updatedBy'
    | 'position'
    | 'rotation'
    | 'seatsList'
    | 'stats'
  > {
  seatsList: ISeat[];
  position: IPosition;
  rowSeats?: ISeat[][];
  visible?: boolean;
  rotation?: number;
  stats?: IBlockStats;
}

export type ISeatStatus = SeatStatus;

export interface ISelectSeatInfo {
  seatInfo: ISeat;
  seatBlock: ISeatBlock;
}

export interface IUpdateSeatStatusDetail
  extends UpdateSeatStatusDetailReq.AsObject {}

export interface IBlockStats extends BlockStats.AsObject {
  //
}
