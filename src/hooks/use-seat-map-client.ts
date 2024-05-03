import { useContext } from 'react';

import { SeatMapClientContext } from '../contexts/client/seat-map-client-context';

export default function useSeatMapClient() {
  const currentSeatMapClientContext = useContext(SeatMapClientContext);

  if (!currentSeatMapClientContext) {
    throw new Error('useSeatMapClient has to be used within <SeatMapClientContext.Provider>');
  }

  return currentSeatMapClientContext;
}
