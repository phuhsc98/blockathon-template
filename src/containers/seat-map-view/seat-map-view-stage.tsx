// type Props = {};

import {
  IStage,
  KonvaEventObject,
  ReactKonvaLayer,
  ReactKonvaStage,
} from '@front-end/common-ui';
import { REACT_APP_STORAGE_ASSETS, isInteger } from '@front-end/core';
import { useEventListener, useNavigate, useTheme } from '@front-end/hooks';

import { Vector2d } from 'konva/lib/types';
import { useRef, useState } from 'react';
import {
  GRID_SIZE,
  MAX_SCALE_BY_CLIENT,
  MIN_SCALE_BY_CLIENT,
  SCALE_BY_CLIENT,
  appConfig,
} from '@constants';
import useSeatMapViewClient from '@hooks/use-seat-map-view-client';

import SeatBlockView from './seat-block-view';
import useKonvaStage from '@hooks/use-konva-stage';
import { ISeatBlock } from '@types';
import { EventTypeListener, isJSON } from '@utils/integrate-mobile-app';
import SeatMapStage from '@components/seat-map-stage';

const gridPath = `${REACT_APP_STORAGE_ASSETS}/${appConfig.storageAssetsPath}/images/grid_3.png`;

export function SeatMapViewStage() {
  const {
    setStagePosition,
    stagePosition,
    stageScale,
    stageRef,
    stageDataOrigin,
    setStageScale,
  } = useKonvaStage();
  const { listSeatGroup } = useSeatMapViewClient();

  const stagePositionRef = useRef<Vector2d>(stagePosition);
  const stageScaleRef = useRef<Vector2d>(stageScale);

  const navigation = useNavigate();
  const theme = useTheme();

  const [size, setSize] = useState({
    width: window.innerWidth,
    // height: window.innerHeight - 56 - 168,
    height: window.innerHeight - 56 - 112,
  });

  function handleStageWheel(e: KonvaEventObject<WheelEvent>) {
    e.evt.preventDefault();
    const currentStage = stageRef.current;

    if (!currentStage) {
      return;
    }
    // stop default scrolling

    const oldScale = currentStage.scaleX();
    const pointer = currentStage.getPointerPosition();

    const isScroll = isInteger(e.evt.deltaY);
    const wheelEvent = e.evt as any;

    if (pointer) {
      const mousePointTo = {
        x: (pointer.x - currentStage.x()) / oldScale,
        y: (pointer.y - currentStage.y()) / oldScale,
      };

      // how to scale? Zoom in? Or zoom out?
      let direction = e.evt.deltaY > 0 ? 1 : -1;

      // when we zoom on trackpad, e.evt.ctrlKey is true
      // in that case lets revert direction
      if (e.evt.ctrlKey) {
        direction = -direction;
      }

      if (isScroll) {
        const newPos = {
          x: currentStage.x() + wheelEvent.wheelDeltaX * 0.3,
          y: currentStage.y() + wheelEvent.wheelDeltaY * 0.3,
        };

        updateStagePosition(newPos, currentStage);
      } else {
        const newScale =
          direction > 0
            ? oldScale * SCALE_BY_CLIENT
            : oldScale / SCALE_BY_CLIENT;
        if (
          newScale >= MIN_SCALE_BY_CLIENT &&
          newScale <= MAX_SCALE_BY_CLIENT
        ) {
          currentStage.scale({ x: newScale, y: newScale });
          currentStage.container().style.backgroundSize = `${
            GRID_SIZE * newScale
          }px`;

          stageScaleRef.current = { x: newScale, y: newScale };
          setStageScale({ x: newScale, y: newScale });

          const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
          };

          updateStagePosition(newPos, currentStage);
        }
      }
    }
  }

  function updateStagePosition(newPos: Vector2d, currentStage?: IStage | null) {
    if (!currentStage) {
      return;
    }

    currentStage.position(newPos);
    currentStage.container().style.backgroundPositionX = `${newPos.x}px`;
    currentStage.container().style.backgroundPositionY = `${newPos.y}px`;

    // backgroundPositionX: stagePositionRef.current.x + (stageScaleRef.current.x * GRID_SIZE) / 2,
    //                 backgroundPositionY: stagePositionRef.current.y + (stageScaleRef.current.x * GRID_SIZE) / 2,
    setStagePosition(newPos);
    stagePositionRef.current = newPos;
  }

  const { handlePickSeatArea, setIsOpenChooseSeatBlock } =
    useSeatMapViewClient();
  const navigate = useNavigate();
  // const theme = useTheme();
  function handleClickSeatBlock(data: ISeatBlock) {
    if (data?.canSelectSeat) {
      navigate(`/${data.id}`);
    } else {
      handlePickSeatArea(data);
      setIsOpenChooseSeatBlock(true);
    }
  }
  async function handleMessage(event: MessageEvent<any>) {
    try {
      let { data: dataEvent } = event;
      dataEvent = isJSON(dataEvent) ? JSON.parse(dataEvent) : dataEvent;
      const { event_type, data: bodyData } = dataEvent;
      // const { data, success } = bodyData || {};

      if (event_type === EventTypeListener.SEAT_MAP_VIEW_DETAIL) {
        bodyData.seatBlock && handleClickSeatBlock(bodyData.seatBlock);
      }

      // throw new Error();
    } catch (error) {
      console.error(error);
    }
  }
  useEventListener('message', handleMessage);

  // console.log('stageScaleRef', stageScale);

  return (
    <ReactKonvaStage
      draggable={true}
      dragBoundFunc={(pos) => {
        const scaleX = stageRef.current?.scaleX() || 1;
        const halfWidth = size.width / 2;
        const halfHeight = size.height / 2;

        const newPos = { x: pos.x, y: pos.y };

        // ** DON'T REMOVE COMMENT
        // *console.log('max-left', (stageDataOrigin?.min.x || 1) * scaleX, -pos.x + halfWidth);
        if ((stageDataOrigin?.min.x || 1) * scaleX >= -pos.x + halfWidth) {
          newPos.x = halfWidth - (stageDataOrigin?.min.x || 1) * scaleX;
        }
        // *console.log('max-right', (stageDataOrigin?.max.x || 1) * scaleX, -pos.x + halfWidth);
        if ((stageDataOrigin?.max.x || 1) * scaleX <= -pos.x + halfWidth) {
          newPos.x = halfWidth - (stageDataOrigin?.max.x || 1) * scaleX;
        }

        // *console.log('max-top', (stageDataOrigin?.min.y || 1) * scaleX, -pos.y + halfHeight);
        if ((stageDataOrigin?.min.y || 1) * scaleX >= -pos.y + halfHeight) {
          newPos.y = halfHeight - (stageDataOrigin?.min.y || 1) * scaleX;
        }

        // *console.log('max-bottom', (stageDataOrigin?.max.y || 1) * scaleX, -pos.y + halfHeight / 2);
        if ((stageDataOrigin?.max.y || 1) * scaleX <= -pos.y + halfHeight) {
          newPos.y = halfHeight - (stageDataOrigin?.max.y || 1) * scaleX;
        }

        updateStagePosition(newPos, stageRef.current);

        return newPos;
      }}
      ref={stageRef}
      width={size.width}
      height={size.height}
      scale={stageScale}
      x={stagePosition.x}
      y={stagePosition.y}
      onWheel={handleStageWheel}
      style={{
        background: `url('${gridPath}')`,
        backgroundRepeat: 'repeat',
        backgroundSize: `${stageScaleRef.current.x * GRID_SIZE}px`,
        backgroundPositionX: stagePositionRef.current.x,
        backgroundPositionY: stagePositionRef.current.y,
      }}>
      <ReactKonvaLayer>
        <SeatMapStage />
        {listSeatGroup.map((group) => (
          <SeatBlockView key={group.id} group={group} />
        ))}
      </ReactKonvaLayer>
    </ReactKonvaStage>
  );
}

export default SeatMapViewStage;
