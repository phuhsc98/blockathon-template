import { useEffect, useMemo, useRef, useState } from 'react';

import { message } from '@front-end/core';
import { ELEMENT_NAME } from '@constants';
import { ESeatStatus, ISeat, ISeatBlock } from '@types';

import {
  IGroup,
  KonvaEventObject,
  ReactKonvaGroup,
} from '@front-end/common-ui';

import { IChooseSeatBlock } from '@contexts/client/choose-seat-block-context';
import useChooseSeatBlock from '@hooks/use-choose-seat-block-context';
import useSeatMapClient from '@hooks/use-seat-map-client';
import Seat from '../components/seat';
import useAppTranslation from '@hooks/use-app-translation/use-app-translation';

interface Props {
  group: ISeatBlock;
}

function SeatBlockDetail({ group }: Props) {
  const { seatMap } = useSeatMapClient();
  const { t } = useAppTranslation('seat-maps-client');
  // const theme = useTheme();
  const containerRef = useRef<IGroup>(null);
  const { listChooseSeatBlock, updateSeatBlock, totalChooseSeat } =
    useChooseSeatBlock();
  const [isNotiShow, setIsNotiShow] = useState(false);

  const currentChooseSeatBlock = useMemo<IChooseSeatBlock | null>(() => {
    if (!group) {
      return null;
    }

    return (
      listChooseSeatBlock.find((item) => item.info.id === group.id) || null
    );
  }, [group, listChooseSeatBlock]);

  const toggleActiveSeat = (seatData: ISeat) => {
    if (seatData.status !== ESeatStatus.SEAT_STATUS_AVAILABLE || !seatMap) {
      return;
    }

    const { chooseSeats } = currentChooseSeatBlock || {};

    const isSelected =
      chooseSeats &&
      chooseSeats.findIndex((item) => item.id === seatData.id) >= 0;

    if (isSelected) {
      const newList = chooseSeats.filter((item) => item.id !== seatData.id);
      updateSeatBlock(newList.length, group, newList);
      return;
    }

    if (totalChooseSeat + 1 > seatMap.maxSeatPerOrder) {
      if (!isNotiShow) {
        setIsNotiShow(true);
        message().open({
          type: 'error',
          content: t('noti.max_seat_per_order', {
            total: seatMap.maxSeatPerOrder,
          }),
          onClose() {
            setIsNotiShow(false);
          },
        });
      }

      return;
    }

    if (chooseSeats?.length) {
      const newList = [...chooseSeats, seatData];
      updateSeatBlock(newList.length, group, newList);
    } else {
      updateSeatBlock(1, group, [seatData]);
    }
  };

  // useEffect(() => {
  //   if (!currentChooseSeatBlock) {
  //     updateSeatBlock(0, group);
  //   }
  // }, [currentChooseSeatBlock]);

  // useEffect(() => {
  //   console.log(
  //     'currentChooseSeatBlock:after',
  //     currentChooseSeatBlock?.chooseSeats?.map((item) => `${item.id}-${item.name}`)
  //   );
  // }, [currentChooseSeatBlock]);

  // const listItem = useMemo(
  //   () =>
  //     group.seatsList.map((seatInfo, index) => (
  //       <Seat
  //         seatInfo={seatInfo}
  //         key={seatInfo.id}
  //         id={seatInfo.id}
  //         name={seatInfo.name}
  //         status={seatInfo.status}
  //         x={seatInfo.position?.x || 0}
  //         y={seatInfo.position?.y || 0}
  //         seatBlock={group}
  //         padding={2}
  //       />
  //     )),
  //   [group.seatsList]
  // );

  function onGroupClick(evt: KonvaEventObject<PointerEvent>) {
    const seatAttrs = evt.target.getAttrs();
    if (seatAttrs?.seatInfo) {
      toggleActiveSeat(seatAttrs.seatInfo);
    }
  }

  function reCache() {
    if (containerRef.current) {
      containerRef.current.cache({
        pixelRatio: 5,
      });
      containerRef.current.getLayer()?.batchDraw();
    }
  }

  const activeSeatList = useMemo(
    () => currentChooseSeatBlock?.chooseSeats?.map((item) => item.id) || [],
    [currentChooseSeatBlock]
  );

  useEffect(() => {
    reCache();
  }, [group.seatsList, activeSeatList]);

  return (
    <ReactKonvaGroup
      ref={containerRef}
      name={ELEMENT_NAME.SEAT_BLOCK}
      id={group.id}
      draggable={false}
      strokeScaleEnabled={false}
      width={group.width}
      height={group.height}
      x={group.position?.x}
      y={group.position?.y}
      // onPointerUp={onGroupClick}
      onTap={onGroupClick}>
      {group.seatsList.map((seatInfo) => (
        <Seat
          key={seatInfo.id}
          id={seatInfo.id}
          seatInfo={seatInfo}
          name={seatInfo.name}
          status={seatInfo.status}
          x={seatInfo.position?.x || 0}
          y={seatInfo.position?.y || 0}
          seatBlock={group}
          padding={2}
          isSelected={activeSeatList.includes(seatInfo.id)}
        />
      ))}
    </ReactKonvaGroup>
  );
}

export default SeatBlockDetail;
