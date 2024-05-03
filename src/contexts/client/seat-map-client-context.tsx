import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';

import { RetrieveSeatMapRes } from '@api/event/mobile/seat_map_pb';
import { message, useStoreToken } from '@front-end/core';
import { useAppMutation } from '@front-end/hooks';

import { seatMapMobileApiService } from '../../api-client/seat-map-mobile-api';
import useChooseSeatBlock from '../../hooks/use-choose-seat-block-context';
import { ISeatMap } from '../../types';
import {
  EventType,
  EventTypeListener,
  isJSON,
  sendMessageToApp,
} from '../../utils/integrate-mobile-app';

import useAppTranslation from '@hooks/use-app-translation/use-app-translation';

type TSeatMapClientContext = {
  seatMap?: ISeatMap;
  showTotalSeat: boolean;
  isLoadingInit: boolean;
  fetchSeatMap: (id: string) => Promise<void>;
};

interface Props {
  children?: ReactNode;
  showTotalSeat?: boolean;
}

export const SeatMapClientContext = createContext<TSeatMapClientContext | null>(
  null
);

export const SeatMapClientContextProvider = ({
  children,
  showTotalSeat = false,
}: Props) => {
  const { updateListSeatBlock } = useChooseSeatBlock();
  const [seatMap, setSeatMap] = useState<ISeatMap>();
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const setToken = useStoreToken((state: any) => state.setToken);

  const {
    i18n: { changeLanguage },
  } = useAppTranslation();

  const { mutateAsync: getSeatMapDetail } = useAppMutation<
    RetrieveSeatMapRes.AsObject,
    { id: string }
  >({
    mutationKey: ['seatMapMobileApiService', 'getSeatMapById'],
    mutationFn: seatMapMobileApiService.getSeatMapById,
    onSuccess: (data) => {
      setSeatMap(data.info);
    },
    // onError: (error, vars, ctx) => {
    //   console.log(error, vars, ctx);
    // },
  });

  async function fetchSeatMap(id: string) {
    try {
      await getSeatMapDetail({ id });
    } catch (error) {
      //
    }
  }

  async function handleInitSeatMap(bodyData: any) {
    const seatMapIds = (bodyData.seatMapIds as string[]) || [];

    if (bodyData.token) {
      setToken(bodyData.token);
    }

    if (bodyData.lang) {
      changeLanguage(bodyData.lang);
    }

    if (seatMapIds[0] !== seatMap?.id) {
      setIsLoadingInit(true);
      await fetchSeatMap(seatMapIds[0]);
      setIsLoadingInit(false);
    }
  }

  async function updateSeatFromApp(bodyData: any) {
    if (bodyData?.seatBlocks) {
      updateListSeatBlock(bodyData.seatBlocks);
    }
  }

  async function handleMessage(event: MessageEvent<any> | Event) {
    try {
      let { data: dataEvent } = event as MessageEvent;

      dataEvent = isJSON(dataEvent) ? JSON.parse(dataEvent) : dataEvent;
      const { event_type, data: bodyData } = dataEvent;
      // const { data, success } = bodyData || {};

      if (Object.values(EventTypeListener).includes(event_type)) {
        // message().open({
        //   type: 'info',
        //   content: (
        //     <div>
        //       <div>
        //         <h3>{event_type}</h3>
        //         <div
        //           style={{
        //             wordWrap: 'break-word',
        //             overflowWrap: 'anywhere',
        //           }}
        //         >
        //           {JSON.stringify(bodyData || {})}
        //         </div>
        //       </div>
        //     </div>
        //   ),
        // });

        switch (event_type) {
          case EventTypeListener.SEAT_MAP_INIT:
            handleInitSeatMap(bodyData);

            break;
          case EventTypeListener.SEAT_MAP_UPDATE_LIST:
            updateSeatFromApp(bodyData);
            break;
          // case EventTypeListener.SEAT_MAP_VIEW_DETAIL:
          //   updateSeatFromApp(bodyData);
          //   break;

          default:
            break;
        }
      }

      // throw new Error();
    } catch (error) {
      console.error(error);
      message().open({
        type: 'error',
        content: 'error',
      });
      //
    }
  }
  // useEventListener('message', handleMessage);
  function postFinishMount() {
    sendMessageToApp({
      event_type: EventType.SEAT_MAP_INIT,
    });
  }

  const valueMemo = useMemo<TSeatMapClientContext>(
    () => ({
      showTotalSeat,
      seatMap,
      isLoadingInit,
      //
      fetchSeatMap,
    }),
    [seatMap, isLoadingInit]
  );

  useEffect(() => {
    // initRealTime();
    // handleInitSeatMap({
    //   token:
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImVtYWlsIjoiIiwiZXhwIjoxNjg2Mjk3MTUzLCJpZCI6IjI0ODcwY2RiLTgzZGQtNDVjZS1hZTM0LTQ5YmZiZWZkOTE2NyIsImlzcyI6ImF1dGgtc2VydmljZSIsIm5hbWUiOiJEYW5nIE5ndXllbiIsInBhcnRuZXJzaGlwX2lkIjoiNjQxMTdlNWExZTQ3ZDRiNzQ1YTYzMzViIiwicm9sZSI6ImN1c3RvbWVyIiwic3ViIjoiNjQ1MzdhNTc1ZGE0YTE2OTE5ZTEyMTUyIn0.WUFYuo4i5fw4nnyeeqys8xGVBSStmN9tlY52kBrAGjI',
    //   partnershipId: '64117e5a1e47d4b745a6335b',
    //   seatMapIds: [
    //     '6455fbcc9f87992d417b8c84', //
    //     '645e113c27c8c499357852db',
    //     // '645e0cdc27c8c499357852d9',
    //   ],
    // });
    // handleInitSeatMap({
    //   token:
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImVtYWlsIjoiZGQ4MjRoZGhza0Bwcml2YXRlcmVsYXkuYXBwbGVpZC5jb20iLCJleHAiOjE2ODU4NjIxNjcsImlkIjoiMWIyOGI0ZTUtZjVhOC00NDBlLTkzZWEtMzZlNDcxZjg4OWUxIiwiaXNzIjoiYXV0aC1zZXJ2aWNlIiwibmFtZSI6IiIsInBhcnRuZXJzaGlwX2lkIjoiNjMwNzIwNjgyZjlhMzJlZjMzNTZiM2FiIiwicm9sZSI6ImN1c3RvbWVyIiwic3ViIjoiNjQ2ODcwOTc3YWJmZjM3YWVlMDZkMzViIn0.J4O-Osgy8Inq5cYDVDq1jxVz_Cnwq_zuWn4ywKcKJh4',
    //   partnershipId: '630720682f9a32ef3356b3ab',
    //   seatMapIds: [
    //     '646dc3ae740d07b98da7280a',
    //     // '64649ebafacfa98f43b402dd', //
    //     // '645e113c27c8c499357852db',
    //     // '645e0cdc27c8c499357852d9',
    //   ],
    // });
    postFinishMount();
    window.addEventListener('message', handleMessage, false);
    document.addEventListener('message', handleMessage, false);

    return () => {
      window.removeEventListener('message', handleMessage, false);
      document.removeEventListener('message', handleMessage, false);
    };
  }, []);

  return (
    <SeatMapClientContext.Provider value={valueMemo}>
      {children}
    </SeatMapClientContext.Provider>
  );
};
