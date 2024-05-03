import { useContext } from 'react';

import { ChooseSeatBlockContext } from '../contexts/client/choose-seat-block-context';

export default function useChooseSeatBlock() {
  const currentChooseSeatBlockContext = useContext(ChooseSeatBlockContext);

  if (!currentChooseSeatBlockContext) {
    throw new Error('useChooseSeatBlock has to be used within <ChooseSeatBlockContext.Provider>');
  }

  return currentChooseSeatBlockContext;
}
