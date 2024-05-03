import { SeatBlock } from '@api/event/web_partnership/seat_map_pb';
import { ISeatBlock } from '../types';

export function normalizeSeatBlock(
  data: SeatBlock.AsObject | ISeatBlock
): ISeatBlock & {
  isComingSoon: boolean;
} {
  return {
    ...data,
    position: {
      x: data.position?.x || 0,
      y: data.position?.y || 0,
    },
    // paperReserved: data.paperReserved,
    isComingSoon: data.name.includes('COMING SOON'), // !HARDCODE FOR COMING SOON FEATURE
  };
}
