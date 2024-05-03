import { useContext } from 'react';
import { SeatMapViewClientContext } from '../contexts/client/seat-map-view-client-context';

export default function useSeatMapViewClient() {
  const currentSeatMapViewClientContext = useContext(SeatMapViewClientContext);

  if (!currentSeatMapViewClientContext) {
    throw new Error('useSeatMapViewClient has to be used within <SeatMapViewClientContext.Provider>');
  }

  //
  return currentSeatMapViewClientContext;
}
