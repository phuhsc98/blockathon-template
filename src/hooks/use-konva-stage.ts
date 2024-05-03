import { useContext } from 'react';
import { KonvaStageContext } from '../contexts/client/konva-stage-context';

export default function useKonvaStage() {
  const currentKonvaStageContext = useContext(KonvaStageContext);

  if (!currentKonvaStageContext) {
    throw new Error('useKonvaStage has to be used within <KonvaStageContext.Provider>');
  }

  //
  return currentKonvaStageContext;
}
