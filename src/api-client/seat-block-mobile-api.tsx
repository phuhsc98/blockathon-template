import {
  ListSeatBlockReq,
  ListSeatBlockRes,
  Position,
  RetrieveSeatBlockReq,
  RetrieveSeatBlockRes,
  Seat,
  SeatBlockInfo,
  SeatLine,
} from '@api/event/mobile/seat_map_pb';
import { ISeatBlock } from '../types';
import { PartnerSeatMapMobileApi } from './seat-map-mobile-api';

export class PartnerSeatBlockMobileApi extends PartnerSeatMapMobileApi {
  getSeatBlockDetail = ({
    seatBlockId,
    seatMapId,
  }: RetrieveSeatBlockReq.AsObject): Promise<RetrieveSeatBlockRes.AsObject> => {
    const req = new RetrieveSeatBlockReq();
    req.setSeatMapId(seatMapId);
    req.setSeatBlockId(seatBlockId);

    return this.grpc<
      RetrieveSeatBlockReq,
      RetrieveSeatBlockRes,
      RetrieveSeatBlockRes.AsObject
    >(this.serviceClient?.retrieveSeatBlock, req, {});
  };

  getListSeatBlock = ({
    seatMapId,
  }: ListSeatBlockReq.AsObject): Promise<ListSeatBlockRes.AsObject> => {
    const req = new ListSeatBlockReq();

    req.setSeatMapId(seatMapId);

    return this.grpc<
      ListSeatBlockReq,
      ListSeatBlockRes,
      ListSeatBlockRes.AsObject
    >(this.serviceClient?.listSeatBlock, req, {});
  };

  generateSeatBlockInfo = (
    {
      color,
      height,
      // id,
      name,
      price,
      seatMapId,
      seatsList,
      totalSeat,
      width,
      canSelectSeat,
      col,
      position,
      row,
      rotation,
    }: ISeatBlock,
    isUpdate?: boolean
  ): SeatBlockInfo => {
    const seatBLockInfo = new SeatBlockInfo();

    const colInfo = new SeatLine();
    if (col) {
      colInfo.setQuantity(col.quantity);
      colInfo.setBeginCharacter(col.beginCharacter);
    }
    seatBLockInfo.setCol(colInfo);
    const rowInfo = new SeatLine();
    if (row) {
      rowInfo.setQuantity(row.quantity);
      rowInfo.setBeginCharacter(row.beginCharacter);
    }
    seatBLockInfo.setRow(rowInfo);

    const positionInfo = new Position();

    if (position) {
      positionInfo.setX(position.x);
      positionInfo.setY(position.y);
    }
    seatBLockInfo.setPosition(positionInfo);
    seatBLockInfo.setCanSelectSeat(!!canSelectSeat);

    seatBLockInfo.setColor(color);
    seatBLockInfo.setHeight(height);
    seatBLockInfo.setWidth(width);

    seatBLockInfo.setName(name);
    seatBLockInfo.setPrice(price);
    seatBLockInfo.setSeatMapId(seatMapId);
    const listSeat: Seat[] = seatsList.map((item) => {
      const newSeat = new Seat();
      if (isUpdate) {
        newSeat.setId(item.id);
      }
      newSeat.setName(item.name);
      newSeat.setStatus(item.status);

      const positionSeat = new Position();
      if (item.position) {
        positionSeat.setX(item.position.x);
        positionSeat.setY(item.position.y);
      }

      newSeat.setOrderX(item.orderX || 0);
      newSeat.setOrderY(item.orderY || 0);

      newSeat.setPosition(positionSeat);

      return newSeat;
    });
    seatBLockInfo.setSeatsList(listSeat);

    seatBLockInfo.setTotalSeat(totalSeat);
    seatBLockInfo.setRotation(rotation || 0);

    return seatBLockInfo;
  };
}

export const seatBlockMobileApiService = new PartnerSeatBlockMobileApi();
export default seatBlockMobileApiService;
