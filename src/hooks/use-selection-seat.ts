import { useContext } from 'react';

import { SelectionSeatContext } from '../contexts/selection-seat-context';

export default function useSelectionSeat() {
  const currentSelectionSeatContext = useContext(SelectionSeatContext);

  if (!currentSelectionSeatContext) {
    throw new Error('useSelectionSeat has to be used within <SelectionSeatContextProvider>');
  }

  return currentSelectionSeatContext;
}
