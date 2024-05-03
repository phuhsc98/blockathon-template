// type Props = {};

import { EventType, sendMessageToApp } from '@utils/integrate-mobile-app';

import { Spin, templateStringToClassName } from '@front-end/common-ui';

import useSeatMapClient from '@hooks/use-seat-map-client';
import SeatMapViewControl from '../../compositions/seat-map-view-control';
import ChooseSeatBlock from './choose-seat-block';
import SeatMapViewStage from './seat-map-view-stage';
import LayoutBack from '@components/layout/layout-back';
import useAppTranslation from '@hooks/use-app-translation/use-app-translation';
import { KonvaStageContextProvider } from '@contexts/client/konva-stage-context';
import { SeatMapViewClientContextProvider } from '@contexts/client/seat-map-view-client-context';

export function SeatMapView() {
  const { isLoadingInit, seatMap } = useSeatMapClient();
  const { t } = useAppTranslation('seat-maps-client');

  function handleBackApp() {
    sendMessageToApp({
      event_type: EventType.SEAT_MAP_BACK,
    });
  }

  if (isLoadingInit) {
    return (
      <LayoutBack handleBack={handleBackApp} title='Chọn khu vực'>
        <div
          className={templateStringToClassName()({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          })}>
          <Spin
            size='large'
            // indicator={<LoadingOutlinedIcon />}
          />
        </div>
      </LayoutBack>
    );
  }

  return (
    <KonvaStageContextProvider isShowGrid>
      <SeatMapViewClientContextProvider seatMapId={seatMap?.id}>
        <LayoutBack
          handleBack={handleBackApp}
          title={t('choose_block.header')}
          footer={<SeatMapViewControl isShowZoom />}>
          <SeatMapViewStage />
          <ChooseSeatBlock />
        </LayoutBack>
      </SeatMapViewClientContextProvider>
    </KonvaStageContextProvider>
  );
}
