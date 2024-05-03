import {
  ICircle,
  IGroup,
  IStage,
  KonvaEventObject,
  ReactKonvaLayer,
  ReactKonvaStage,
  Spin,
  templateStringToClassName,
} from '@front-end/common-ui';
import { isInteger } from '@front-end/core';
import { useAppMutation } from '@front-end/hooks';

import {
  RetrieveSeatBlockReq,
  RetrieveSeatBlockRes,
} from '@api/event/mobile/seat_map_pb';

import { PublicationContext, Subscription } from 'centrifuge';
import { Vector2d } from 'konva/lib/types';
import { useEffect, useRef, useState } from 'react';

import { ELEMENT_NAME, GRID_SIZE, SCALE_BY_CLIENT } from '@constants';
import useKonvaStage from '@hooks/use-konva-stage';
import useSeatMapClient from '@hooks/use-seat-map-client';
import {
  IBlockStatusData,
  ISeatBlock,
  IWSMessageEvent,
  WSEventTypeListener,
} from '@types';

import { normalizeSeatBlock } from '@utils/normalize';
import SeatBlockInfo from '@components/seat-block-info';
import SeatBlockDetail from '../../compositions/seat-block-detail';
import { useWebSocket } from '@hooks/use-web-socket';
import seatBlockMobileApiService from '@api-client/seat-block-mobile-api';

type SelectSeatDetailProps = {
  seatBlockId: string;
};

const DEFAULT_COORDINATES: Vector2d = { x: 0, y: 0 };

const HEADER_HEIGHT = 56;
const INFO_HEIGHT = 72;
const CONTROL_HEIGHT = 112;
const CHOOSE_SEATS_HEIGHT = 48;

export function SelectSeatDetail({ seatBlockId }: SelectSeatDetailProps) {
  const { seatMap } = useSeatMapClient();
  const { isLoadingInit: isLoadingInitSocket, centrifuge } = useWebSocket();

  const {
    setStagePosition,
    stagePosition,
    stageScale,
    stageRef,
    stageDataOrigin,
    setStageScale,
    updateStageDataOrigin,

    minScale,
    maxScale,
  } = useKonvaStage();

  const stagePositionRef = useRef<Vector2d>(stagePosition);
  const stageScaleRef = useRef<Vector2d>(stageScale);

  // const navigation = useNavigate();
  // const theme = useTheme();

  const [size, setSize] = useState({
    width: window.innerWidth,
    // height: window.innerHeight - 56 - 168,
    height:
      window.innerHeight -
      (HEADER_HEIGHT + INFO_HEIGHT + CONTROL_HEIGHT + CHOOSE_SEATS_HEIGHT),
  });
  const [seatBlockDetailData, setSeatBlockDetailData] = useState<ISeatBlock>();
  const { mutateAsync: getSeatBlockDetail } = useAppMutation<
    RetrieveSeatBlockRes.AsObject,
    RetrieveSeatBlockReq.AsObject
  >({
    mutationKey: ['seatBlockMobileApiService', 'getSeatBlockDetail'],
    mutationFn: seatBlockMobileApiService.getSeatBlockDetail,
    onSuccess: (data) => {
      setSeatBlockDetailData(data?.info && normalizeSeatBlock(data.info));
    },
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
        if (newScale >= minScale && newScale <= maxScale) {
          currentStage.scale({ x: newScale, y: newScale });
          currentStage.container().style.backgroundSize = `${
            GRID_SIZE * newScale
          }px`;

          stageScaleRef.current = { x: newScale, y: newScale };

          const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
          };

          updateStagePosition(newPos, currentStage);

          setStageScale({ x: newScale, y: newScale });
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

  // const seatBlockDetailData = useMemo(
  //   () => seatBlockDetail?.info && normalizeSeatBlock(seatBlockDetail.info),
  //   [seatBlockDetail]
  // );

  function calcStageDataOrigin() {
    if (!seatBlockDetailData) {
      return {
        min: DEFAULT_COORDINATES,
        max: DEFAULT_COORDINATES,
        center: DEFAULT_COORDINATES,
      };
    }

    const pointA: Vector2d = { x: Infinity, y: Infinity }; // top left point
    const pointB: Vector2d = { x: -Infinity, y: -Infinity }; // bottom right point

    if (seatBlockDetailData.position) {
      const { x, y } = seatBlockDetailData.position;
      if (x < pointA.x) {
        pointA.x = x;
      }

      if (y < pointA.y) {
        pointA.y = y;
      }

      if (x + seatBlockDetailData.width > pointB.x) {
        pointB.x = x + seatBlockDetailData.width;
      }

      if (y + seatBlockDetailData.height > pointB.y) {
        pointB.y = y + seatBlockDetailData.height;
      }
    }

    const stageWidth = stageRef.current?.width() || window.innerWidth;
    const stageHeight = stageRef.current?.height() || window.innerHeight;

    // Find middle point between AB and plus center point canvas viewport
    const centerPoint: Vector2d = {
      x: -(pointA.x + pointB.x) / 2 + stageWidth / 2 / stageScale.x,
      y: -(pointA.y + pointB.y) / 2 + stageHeight / 2 / stageScale.y,
    };

    function calcScale(point: Vector2d) {
      return {
        x: point.x * stageScale.x,
        y: point.y * stageScale.y,
      };
    }

    updateStageDataOrigin({
      min: pointA,
      max: pointB,
      center: calcScale(centerPoint),
    });
  }

  function onSyncBlockStatus(data: IBlockStatusData[]) {
    try {
      const findBlockData = data?.find(
        (item) => item.blockID === seatBlockDetailData?.id
      );

      if (findBlockData && seatMap) {
        getSeatBlockDetail({
          seatBlockId,
          seatMapId: seatMap.id,
        });
        // const seatList = findBlockData.seats;
        // setSeatBlockDetailData((prevState) => {
        //   if (prevState) {
        //     return {
        //       ...prevState,
        //       stats: findBlockData.blockStats,
        //       seatsList: prevState.seatsList.map((seatItem) => {
        //         const findChangeStatus = seatList?.find(
        //           (i) => i.id === seatItem.id
        //         );

        //         if (findChangeStatus) {
        //           return {
        //             ...seatItem,
        //             log: findChangeStatus.log,
        //             status: findChangeStatus.status ?? seatItem.status,
        //           };
        //         }

        //         return seatItem;
        //       }),
        //     };
        //   }
        //   return;
        // });
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  function onPublication(ctx: PublicationContext) {
    const bodyData = ctx.data as IWSMessageEvent<IBlockStatusData[]>;

    // console.log('bodyData-client-detail', bodyData);

    if (
      bodyData?.eventType === WSEventTypeListener.SEAT_STATUS &&
      bodyData.data
    ) {
      onSyncBlockStatus(bodyData.data);
    }
  }

  function subscribeSeatMapChannel(channelName: string): Subscription | null {
    if (!centrifuge || !seatMap?.id) {
      return null;
    }

    const currentSub = centrifuge?.getSubscription(channelName);
    if (currentSub) {
      currentSub.removeListener('publication', onPublication);
      currentSub.addListener('publication', onPublication);
      currentSub.subscribe();

      return currentSub;
    }

    // console.log('channelName', channelName);
    const sub = centrifuge.newSubscription(channelName, {});
    sub
      .on('state', function (ctx) {
        console.log('state', ctx);
        // document.title = ctx.data.value;
      })
      .on('publication', onPublication)
      // .on('publication', function (ctx) {
      //   const bodyData = ctx.data as IWSMessageEvent<IBlockStatusData[]>;

      //   console.log('bodyData-client-detail', bodyData);

      //   if (bodyData?.eventType === WSEventTypeListener.BLOCK_STATUS && bodyData.data) {
      //     onSyncBlockStatus(bodyData.data);
      //   }
      // })
      .on('subscribing', function (ctx) {
        console.log(`subscribing: ${ctx.code}, ${ctx.reason}`);
      })
      .on('subscribed', function (ctx) {
        console.log('subscribed', ctx);
      })
      .on('unsubscribed', function (ctx) {
        console.log(`unsubscribed: ${ctx.code}, ${ctx.reason}`);
      })
      .subscribe();

    return sub;
  }

  // function shouldDisplayInViewport() {
  //   const currentStage = stageRef.current;

  //   if (!currentStage) {
  //     return;
  //   }
  //   // const currentScale = currentStage.scale();

  //   // if (currentScale && currentScale.x < VISIBLE_SCALE_VALUE) {
  //   //   setListSeatGroup((prevState) => prevState.map((item) => ({ ...item, visible: false })));

  //   //   return;
  //   // }
  //   // const listSeatGroup = []

  //   const visibleMap = new Map();

  //   const listSeatChild = currentStage.find<IGroup>(`.${ELEMENT_NAME.SEAT}`);

  //   listSeatChild.forEach((item) => {
  //     const isVisible = item?.isClientRectOnScreen();
  //     if (isVisible) {
  //       console.count(`seat:${item.id}`);
  //     }
  //     visibleMap.set(item.id, isVisible);
  //   });
  // }

  useEffect(() => {
    let sub: Subscription | null = null;
    if (seatBlockDetailData && !isLoadingInitSocket) {
      sub = subscribeSeatMapChannel(`SEATBLOCK-${seatBlockDetailData.id}`);
    }

    return () => {
      if (sub) {
        sub.unsubscribe();
      }
    };
  }, [isLoadingInitSocket, seatBlockDetailData?.id]);

  useEffect(() => {
    if (seatBlockId && seatMap) {
      getSeatBlockDetail({
        seatBlockId,
        seatMapId: seatMap.id,
      });
    }
  }, [seatBlockId, seatMap]);

  useEffect(() => {
    if (seatBlockDetailData && stageRef.current) {
      calcStageDataOrigin();
    }
  }, [seatBlockDetailData?.seatsList.length, stageRef]);

  useEffect(() => {
    if (stageDataOrigin?.center) {
      stageRef.current?.setPosition(stageDataOrigin.center);
    }
  }, [stageDataOrigin]);

  // useEffect(() => {
  //   const timerChange = setTimeout(() => {
  //     if (seatBlockDetailData) {
  //       shouldDisplayInViewport();
  //     }
  //   }, 200);
  //   return () => {
  //     if (timerChange) {
  //       clearTimeout(timerChange);
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [stagePosition, stageScale, seatBlockDetailData]);

  if (!seatBlockDetailData) {
    return (
      <div
        className={templateStringToClassName()({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        })}>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <div>
      <SeatBlockInfo
        // blockStats={{
        //   available: seatBlockDetailData.seatsList.reduce((total, item) => {
        //     if (item.status === ESeatStatus.SEAT_STATUS_AVAILABLE) {
        //       return total + 1;
        //     } else {
        //       return total;
        //     }
        //   }, 0),
        //   booking: 0,
        //   locked: 0,
        //   sold: 0,
        // }}

        blockStats={
          seatBlockDetailData?.stats || {
            available: 0,
            booking: 0,
            locked: 0,
            sold: 0,
          }
        }
        group={seatBlockDetailData}
      />
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
        onWheel={handleStageWheel}>
        <ReactKonvaLayer>
          <SeatBlockDetail group={seatBlockDetailData} />
        </ReactKonvaLayer>
      </ReactKonvaStage>
    </div>
  );
}

export default SelectSeatDetail;
