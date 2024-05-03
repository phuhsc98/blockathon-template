import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ListSeatBlockReq,
  ListSeatBlockRes,
} from '@api/event/mobile/seat_map_pb';
import { useAppMutation } from '@front-end/hooks';
import { Vector2d } from 'konva/lib/types';
import { seatBlockMobileApiService } from '../../api-client/seat-block-mobile-api';

import useKonvaStage from '../../hooks/use-konva-stage';
import { IBlockStatusData, ISeatBlock } from '../../types';
import { normalizeSeatBlock } from '../../utils/normalize';

import { PublicationContext, Subscription } from 'centrifuge';
import { IWSMessageEvent, WSEventTypeListener } from '../../types/ws-listener';

import { useWebSocket } from '@hooks/use-web-socket';
import pLimit from 'p-limit';
const syncBlockLimit = pLimit(10);

type TSeatMapViewClientContext = {
  isOpenChooseSeatBlock: boolean;
  listSeatGroup: ISeatBlock[];
  chooseSeatGroup?: ISeatBlock;
  stageDataOrigin?: {
    min: Vector2d;
    max: Vector2d;
    center: Vector2d;
  };

  setIsOpenChooseSeatBlock: Dispatch<SetStateAction<boolean>>;
  setListSeatGroup: Dispatch<SetStateAction<ISeatBlock[]>>;
  setChooseSeatGroup: Dispatch<SetStateAction<ISeatBlock | undefined>>;

  handlePickSeatArea: (data?: ISeatBlock) => void;
};

interface Props {
  children?: ReactNode;
  seatMapId?: string;
}
export const SeatMapViewClientContext =
  createContext<TSeatMapViewClientContext | null>(null);

export const SeatMapViewClientContextProvider = ({
  children,
  seatMapId,
}: Props) => {
  const { stageRef, updateStageDataOrigin, stageScale, zoomStage } =
    useKonvaStage();

  const [isOpenChooseSeatBlock, setIsOpenChooseSeatBlock] = useState(false);

  const [listSeatGroup, setListSeatGroup] = useState<ISeatBlock[]>([]);
  const [chooseSeatGroup, setChooseSeatGroup] = useState<ISeatBlock>();

  const { isLoadingInit: isLoadingInitSocket, centrifuge } = useWebSocket();

  const { mutateAsync: getListSeatBlock } = useAppMutation<
    ListSeatBlockRes.AsObject,
    ListSeatBlockReq.AsObject
  >({
    mutationKey: ['seatBlockMobileApiService', 'getListSeatBlock'],
    mutationFn: seatBlockMobileApiService.getListSeatBlock,
    onSuccess: (data) => {
      const pointA: Vector2d = { x: Infinity, y: Infinity }; // top left point
      const pointB: Vector2d = { x: -Infinity, y: -Infinity }; // bottom right point
      data.itemsList.forEach((item) => {
        if (item.position) {
          const { x, y } = item.position;
          if (x < pointA.x) {
            pointA.x = x;
          }

          if (y < pointA.y) {
            pointA.y = y;
          }

          if (x + item.width > pointB.x) {
            pointB.x = x + item.width;
          }

          if (y + item.height > pointB.y) {
            pointB.y = y + item.height;
          }
        }
      });

      const stageWidth = stageRef.current?.width() || window.innerWidth;
      const stageHeight = stageRef.current?.height() || window.innerHeight;

      // Find middle point between AB and plus center point canvas viewport
      const centerPoint: Vector2d = {
        x: -(pointA.x + pointB.x) / 2 + stageWidth / 2 / stageScale.x,
        y: -(pointA.y + pointB.y) / 2 + stageHeight / 2 / stageScale.y,
      };
      stageRef.current?.setPosition(centerPoint);
      updateStageDataOrigin({
        min: pointA,
        max: pointB,
        center: centerPoint,
      });

      // RESET SCALE BY SEATMAP
      const maxDiagonalStageScreen = Math.sqrt(
        Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
      );
      const maxDiagonalStage = Math.sqrt(
        Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
      );
      zoomStage(
        (maxDiagonalStage + maxDiagonalStageScreen / 2) / maxDiagonalStageScreen
      )(false, 0.2);
      setListSeatGroup(data.itemsList.map((item) => normalizeSeatBlock(item)));
    },
    // onError: (error, vars, ctx) => {
    //   console.log(error, vars, ctx);
    // },
  });

  const { mutateAsync: getSeatBlockDetail } = useAppMutation({
    mutationKey: ['seatBlockMobileApiService', 'getSeatBlockDetail'],
    mutationFn: seatBlockMobileApiService.getSeatBlockDetail,
  });

  function handlePickSeatArea(data?: ISeatBlock) {
    if (data?.id) {
      setChooseSeatGroup(data);
    } else {
      setChooseSeatGroup(undefined);
    }
  }

  async function syncSeatBlockById(
    id: string
  ): Promise<ISeatBlock | undefined> {
    return syncBlockLimit(async () => {
      try {
        if (!seatMapId) return;
        const res = await getSeatBlockDetail({
          seatBlockId: id,
          seatMapId: seatMapId,
        });

        if (res.info) {
          const newData = normalizeSeatBlock(res.info);
          setListSeatGroup((prevState) =>
            prevState.map((item) => {
              if (item.id === newData.id) {
                return { ...newData };
              }

              return item;
            })
          );

          return newData;
        }

        return;
      } catch (error) {
        console.error(error);
      }
    });
  }

  function onSyncBlockStatus(data: IBlockStatusData[]) {
    try {
      data?.forEach((blockData) => {
        if (blockData.blockID) {
          syncSeatBlockById(blockData.blockID);
        }
      });
      // data?.forEach((blockData) => {
      //   const seatList = blockData.seats;
      //   setListSeatGroup((prevState) =>
      //     prevState.map((item) => {
      //       if (item.id === blockData.blockID) {
      //         return {
      //           ...item,
      //           stats: blockData.blockStats,
      //           seatsList: item.seatsList.map((seatItem) => {
      //             const findChangeStatus = seatList?.find(
      //               (i) => i.id === seatItem.id
      //             );

      //             if (findChangeStatus) {
      //               return {
      //                 ...seatItem,
      //                 log: findChangeStatus.log,
      //                 status: findChangeStatus.status ?? seatItem.status,
      //               };
      //             }

      //             return seatItem;
      //           }),
      //         };
      //       }

      //       return item;
      //     })
      //   );
      // });
    } catch (error) {
      console.error('error', error);
    }
  }

  function onPublication(ctx: PublicationContext) {
    const bodyData = ctx.data as IWSMessageEvent<IBlockStatusData[]>;
    // console.log('bodyData-client-view', bodyData);
    if (
      bodyData?.eventType === WSEventTypeListener.SEAT_STATUS &&
      bodyData.data
    ) {
      onSyncBlockStatus(bodyData.data);
    }
  }

  function subscribeSeatMapChannel(channelName: string): Subscription | null {
    if (!centrifuge || !seatMapId) {
      return null;
    }

    const currentSub = centrifuge?.getSubscription(channelName);
    if (currentSub) {
      currentSub.removeListener('publication', onPublication);
      currentSub.addListener('publication', onPublication);
      currentSub.subscribe();

      return currentSub;
    }

    console.log('channelName', channelName);
    const sub = centrifuge.newSubscription(channelName);
    sub
      .on('state', function (ctx) {
        console.log('state', ctx);
      })
      .on('publication', onPublication)
      // .on('publication', function (ctx) {
      //   const bodyData = ctx.data as IWSMessageEvent<IBlockStatusData[]>;
      //   console.log('bodyData-client-view', bodyData);
      //   if (bodyData?.eventType === WSEventTypeListener.SEAT_STATUS && bodyData.data) {
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

  useEffect(() => {
    if (seatMapId) {
      getListSeatBlock({ seatMapId });
    }
  }, [seatMapId]);

  useEffect(() => {
    let sub: Subscription | null = null;

    if (seatMapId && !isLoadingInitSocket) {
      sub = subscribeSeatMapChannel(`SEATMAP-${seatMapId}`);
    }

    return () => {
      if (sub) {
        sub.unsubscribe();
      }
    };
  }, [isLoadingInitSocket, seatMapId]);

  const valueMemo = useMemo<TSeatMapViewClientContext>(
    () => ({
      listSeatGroup,
      chooseSeatGroup,
      isOpenChooseSeatBlock,
      //

      setIsOpenChooseSeatBlock,
      setListSeatGroup,

      setChooseSeatGroup,
      handlePickSeatArea,
    }),
    [listSeatGroup, chooseSeatGroup, isOpenChooseSeatBlock]
  );

  return (
    <SeatMapViewClientContext.Provider value={valueMemo}>
      {children}
    </SeatMapViewClientContext.Provider>
  );
};
