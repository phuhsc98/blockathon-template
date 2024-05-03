import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Vector2d } from 'konva/lib/types';
import {
  GRID_SIZE,
  MAX_SCALE_BY_CLIENT,
  MIN_SCALE_BY_CLIENT,
} from '../../constants';

import { IStage } from '@front-end/common-ui';

export interface IStageData {
  min: Vector2d;
  max: Vector2d;
  center: Vector2d;
}
type TKonvaStageContext = {
  stageScale: Vector2d;
  stagePosition: Vector2d;
  stageRef: RefObject<IStage>;
  stageDataOrigin?: IStageData;
  setStagePosition: Dispatch<SetStateAction<Vector2d>>;
  setStageScale: Dispatch<SetStateAction<Vector2d>>;
  maxScale: number;
  minScale: number;

  zoomStage: (value: number) => (direction: boolean, duration?: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;

  updateStageDataOrigin: (data: IStageData) => void;
};

interface Props {
  children?: ReactNode;
  isShowGrid?: boolean;
  maxScale?: number;
  minScale?: number;
  defaultScale?: number;
}
export const KonvaStageContext = createContext<TKonvaStageContext | null>(null);

export const KonvaStageContextProvider = ({
  children,
  isShowGrid,
  minScale = MIN_SCALE_BY_CLIENT,
  maxScale = MAX_SCALE_BY_CLIENT,
  defaultScale = 1,
}: Props) => {
  const stageRef = useRef<IStage>(null);
  // const stageDataOrigin = useRef<IStageData>();
  const [stageDataOrigin, setStageDataOrigin] = useState<IStageData>();
  const [stagePosition, setStagePosition] = useState<Vector2d>({
    x: 0,
    y: 0,
  });

  const [stageScale, setStageScale] = useState<Vector2d>({
    x: defaultScale,
    y: defaultScale,
  });

  function zoomStage(value: number) {
    return (direction: boolean, duration = 0.3) => {
      const currentStage = stageRef.current;
      if (!currentStage) {
        return;
      }

      const oldScale = currentStage.scaleX();

      const center = {
        x: currentStage.width() / 2,
        y: currentStage.height() / 2,
      };

      const relatedTo = {
        x: (center.x - currentStage.x()) / oldScale,
        y: (center.y - currentStage.y()) / oldScale,
      };

      let newScale = direction ? oldScale * value : oldScale / value;

      if (newScale > maxScale) {
        newScale = maxScale;
      }

      if (newScale < minScale) {
        newScale = minScale;
      }

      const newPos = {
        x: center.x - relatedTo.x * newScale,
        y: center.y - relatedTo.y * newScale,
      };

      currentStage.to({
        scaleX: newScale,
        scaleY: newScale,
        x: newPos.x,
        y: newPos.y,
        duration: duration,
      });

      if (isShowGrid) {
        currentStage.container().style.transition = 'background 0.3s';
        currentStage.container().style.backgroundSize = `${
          GRID_SIZE * newScale
        }px`;
        currentStage.container().style.backgroundPositionX = `${newPos.x}px`;
        currentStage.container().style.backgroundPositionY = `${newPos.y}px`;

        setTimeout(() => {
          currentStage.container().style.transition = 'none';
        }, 500);
      }

      // currentStage.position(newPos);
    };
  }

  const zoomInOut = useCallback(
    (direction: boolean) => zoomStage(2)(direction),
    []
  );

  function zoomIn() {
    zoomInOut(true);
  }

  function zoomOut() {
    zoomInOut(false);
  }

  function updateStageDataOrigin(data: IStageData) {
    setStageDataOrigin(data);
  }

  const valueMemo = useMemo<TKonvaStageContext>(
    () => ({
      stagePosition,
      stageScale,
      stageDataOrigin,
      //
      setStagePosition,
      setStageScale,
      maxScale,
      minScale,

      stageRef,
      zoomStage,
      zoomIn,
      zoomOut,
      updateStageDataOrigin,
    }),
    [
      stagePosition, //
      stageScale,
      stageDataOrigin,
      stageRef,
    ]
  );

  return (
    <KonvaStageContext.Provider value={valueMemo}>
      {children}
    </KonvaStageContext.Provider>
  );
};
