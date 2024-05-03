import { OrderByItem, PaginationReq } from '@api/base/base_pb';
import {
  ListSeatMapReq,
  RetrieveSeatMapReq,
  RetrieveSeatMapRes,
} from '@api/event/mobile/seat_map_pb';
import { SeatMapServiceClient } from '@api/event/mobile/seat_map_grpc_web_pb';
import { BaseApi, BaseApiOptions } from '@front-end/core';

export class PartnerSeatMapMobileApi extends BaseApi<SeatMapServiceClient> {
  constructor(option?: BaseApiOptions) {
    super(option);
    this.serviceClient = new SeatMapServiceClient(this.url, null, this.optsDev);
  }

  getSeatMapById = ({
    id,
  }: RetrieveSeatMapReq.AsObject): Promise<RetrieveSeatMapRes.AsObject> => {
    const req = new RetrieveSeatMapReq();
    req.setId(id);
    return this.grpc<
      RetrieveSeatMapReq,
      RetrieveSeatMapRes,
      RetrieveSeatMapRes.AsObject
    >(this.serviceClient?.retrieveSeatMap, req, {});
  };

  getListSeatMap = ({
    searchText,
    pagination,
    orderByList,
  }: ListSeatMapReq.AsObject) => {
    const req = new ListSeatMapReq();
    const paginationInfoPB = new PaginationReq();

    if (pagination) {
      paginationInfoPB.setPageLimit(pagination.pageLimit);
      paginationInfoPB.setPageNumber(pagination.pageNumber);
    }

    const orderByListInfoPB = orderByList?.map((orderByList) => {
      const order = new OrderByItem();
      order.setDesc(orderByList.desc);
      order.setField(orderByList.field);
      return order;
    });

    req.setSearchText(searchText);
    req.setPagination(paginationInfoPB);
    req.setOrderByList(orderByListInfoPB);

    // TODO: Refactor response type
    return this.grpc<ListSeatMapReq, any, any>(
      this.serviceClient?.listSeatMap,
      req,
      {}
    );
  };
}

export const seatMapMobileApiService = new PartnerSeatMapMobileApi();
export default seatMapMobileApiService;
