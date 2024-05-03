import { useNavigate } from '@front-end/hooks';
import useSeatMapViewClient from '@hooks/use-seat-map-view-client';
import { ISeatBlock } from '@types';
import SeatBlockItem from '@components/seat-block-item';
import { normalizeSeatBlock } from '@utils/normalize';

import { message } from '@front-end/core';
import useSeatMapClient from '@hooks/use-seat-map-client';

interface Props {
  group: ISeatBlock;
}

function SeatBlockView({ group }: Props) {
  const { showTotalSeat } = useSeatMapClient();
  const { setIsOpenChooseSeatBlock, handlePickSeatArea } =
    useSeatMapViewClient();
  const navigate = useNavigate();

  function handleClickSeatBlock(data: ISeatBlock) {
    const seatBlockData = normalizeSeatBlock(data);

    if (seatBlockData.isComingSoon) {
      message().open({
        content: 'COMING SOON',
        type: 'info',
      });
      return;
    }

    if (data.canSelectSeat) {
      navigate(`/${data.id}`);
    } else {
      handlePickSeatArea(data);
      setIsOpenChooseSeatBlock(true);
    }
  }

  return (
    <SeatBlockItem
      isShowTotal={showTotalSeat}
      group={group}
      handleClickSeatBlock={handleClickSeatBlock}
    />
  );
}

export default SeatBlockView;
