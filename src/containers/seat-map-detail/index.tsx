// type Props = {};

import { useNavigate } from '@front-end/hooks';

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { KonvaStageContextProvider } from '@contexts/client/konva-stage-context';
import useChooseSeatBlock from '@hooks/use-choose-seat-block-context';

import { ISeat } from '@types';

import SeatMapViewControl from '../../compositions/seat-map-view-control';
import SelectSeatDetail from './select-seat-detail';
import useAppTranslation from '@hooks/use-app-translation/use-app-translation';
import ChooseTicketList from '@components/choose-ticket-list';
import LayoutBack from '@components/layout/layout-back';

export function SeatMapDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useAppTranslation('seat-maps-client');
  const { listChooseSeatBlock, removeSeat } = useChooseSeatBlock();

  const currentChooseSeatBlock = useMemo(
    () => listChooseSeatBlock.find((item) => item.info.id === id),
    [listChooseSeatBlock]
  );

  // const { isLoadingInit, seatMap } = useSeatMapClient();

  // const theme = useTheme();

  function handleBackApp() {
    navigate('/');
  }

  const handleRemoveSeat = (seatData: ISeat) => () => {
    if (currentChooseSeatBlock) {
      removeSeat(seatData, currentChooseSeatBlock.info);
    }
  };

  // if (isLoadingInit) {
  //   return (
  //     <LayoutBack handleBack={handleBackApp} title="Chọn ghế">
  //       <div
  //         className={templateStringToClassName()({
  //           display: 'flex',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           height: '100%',
  //         })}
  //       >
  //         <Spin
  //           size="large"
  //           // indicator={<LoadingOutlinedIcon />}
  //         />
  //       </div>
  //     </LayoutBack>
  //   );
  // }

  return (
    <KonvaStageContextProvider minScale={1.5} maxScale={8} defaultScale={4}>
      <LayoutBack
        handleBack={handleBackApp}
        title={t('detail.header')}
        footer={
          <>
            <ChooseTicketList
              handleRemoveSeat={handleRemoveSeat}
              chooseSeats={currentChooseSeatBlock?.chooseSeats || []}
            />
            <SeatMapViewControl isContinueBtn isShowZoom />
          </>
        }>
        {id && <SelectSeatDetail seatBlockId={id} />}
      </LayoutBack>
    </KonvaStageContextProvider>
  );
}
