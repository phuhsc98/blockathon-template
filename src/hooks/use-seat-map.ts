import { SeatMapClientContext } from '@contexts/client/seat-map-client-context';
import { useContext } from 'react';

export default function useSeatMap() {
  const currentSeatMapContext = useContext(SeatMapClientContext);

  if (!currentSeatMapContext) {
    throw new Error(
      'useSeatMap has to be used within <SeatMapContext.Provider>'
    );
  }

  return currentSeatMapContext;
}
