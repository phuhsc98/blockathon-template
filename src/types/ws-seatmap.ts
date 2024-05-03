import { IBlockStats, ISeatStatus, ISeatStatusLog } from './seatmap';

export interface IBlockStatusData {
  blockID: string;
  blockStats: IBlockStats;
  // seats: Partial<ISeat>[];
  seats: { id: string; status: ISeatStatus; log?: ISeatStatusLog }[];
}

const mockData = {
  eventType: 'BLOCK_STATUS',
  data: [
    {
      blockId: '6440b9f3280a18834f6115ae',
      blockStats: {
        available: 20,
        booking: 10,
        locked: 30,
        sold: 40,
      },
      seats: [
        {
          seatId: '6440b9f3280a18834f6115af',
          status: 1,
        },
        {
          seatId: '6440b9f3280a18834f6115af',
          status: 1,
        },
      ],
    },
  ],
};
