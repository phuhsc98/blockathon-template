import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Row,
  Space,
  styledComponent,
  templateStringToClassName,
} from '@front-end/common-ui';
import {
  EButtonSize,
  EButtonType,
  ESpaceAlign,
  ESpaceDirection,
  formatCurrency,
} from '@front-end/core';

import useChooseSeatBlock from '@hooks/use-choose-seat-block-context';
import useSeatMapClient from '@hooks/use-seat-map-client';

import { useNavigate } from '@front-end/hooks';

import { IChooseSeatBlock } from '@contexts/client/choose-seat-block-context';
import useKonvaStage from '@hooks/use-konva-stage';
import { ISeatMap } from '@types';
import { EventType, sendMessageToApp } from '@utils/integrate-mobile-app';
import LayoutBack from '@components/layout/layout-back';
import useAppTranslation from '@hooks/use-app-translation/use-app-translation';

const TotalSeatStyled = styledComponent('span')(({ theme }) => ({
  color: theme.colorPrimary,
}));

const TotalPriceStyled = styledComponent('span')(({ theme }) => ({
  color: theme.colorPrimary,
  fontWeight: 700,
  whiteSpace: 'nowrap',
  textAlign: 'right',
}));

const SeeAllStyled = styledComponent('span')(() => ({
  color: '#595959',
}));

const ControlFooterStyled = styledComponent('div')(({ theme }) => ({
  fontFamily: theme.fontFamily,
  position: 'relative',
}));

const ControlStyled = styledComponent('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const IconButtonStyled = styledComponent(Button)(({ theme }) => ({
  // borderRadius: `${theme.borderRadiusLG}px !important`,
}));

type SeatMapViewControlProps = {
  isShowZoom?: boolean;
  isContinueBtn?: boolean;
};

export function SeatMapViewControl({
  isShowZoom,
  isContinueBtn,
}: SeatMapViewControlProps) {
  const { seatMap } = useSeatMapClient();
  const { zoomIn, zoomOut } = useKonvaStage();
  const { totalChooseSeat, totalPrice, listChooseSeatBlock } =
    useChooseSeatBlock();
  const { t } = useAppTranslation('seat-maps-client');
  const navigate = useNavigate();

  function appendSeatMapForMobile(
    data: IChooseSeatBlock[],
    seatMap?: ISeatMap
  ) {
    return data.map((item) => ({
      ...item,
      info: {
        ...item.info,
        seatMap,
      },
    }));
  }

  function handleSubmitTicket() {
    sendMessageToApp({
      event_type: EventType.SEAT_MAP_SUBMIT,
      data: {
        seatBlocks: appendSeatMapForMobile(listChooseSeatBlock, seatMap),
      },
    });
  }

  function handleSeeAll() {
    sendMessageToApp({
      event_type: EventType.SEAT_MAP_VIEW,
      data: {
        seatBlocks: appendSeatMapForMobile(listChooseSeatBlock, seatMap),
      },
    });
  }

  // const { handlePickSeatArea, setIsOpenChooseSeatBlock } = useSeatMapViewClient();
  // // const navigate = useNavigate();
  // // const theme = useTheme();
  // function handleClickSeatBlock(data: ISeatBlock) {
  //   if (data?.canSelectSeat) {
  //     navigate(`/${data.id}`);
  //   } else {
  //     handlePickSeatArea(data);
  //     setIsOpenChooseSeatBlock(true);
  //   }
  // }
  // async function handleMessage(event: MessageEvent<any>) {
  //   try {
  //     let { data: dataEvent } = event;
  //     dataEvent = isJSON(dataEvent) ? JSON.parse(dataEvent) : dataEvent;
  //     const { event_type, data: bodyData } = dataEvent;
  //     // const { data, success } = bodyData || {};

  //     if (event_type === EventTypeListener.SEAT_MAP_VIEW_DETAIL) {
  //       bodyData.seatBlock && handleClickSeatBlock(bodyData.seatBlock);
  //     }

  //     // throw new Error();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // useEventListener('message', handleMessage);

  return (
    <ControlFooterStyled>
      {isShowZoom && (
        <div
          className={templateStringToClassName()({
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            bottom: 'calc(100% + 30px + 48px)',
            right: 0,
          })}>
          <Space
            size={[0, 8]}
            direction={ESpaceDirection.Vertical}
            align={ESpaceAlign.End}>
            <IconButtonStyled
              type={EButtonType.Default}
              shape='default'
              icon={<ZoomInOutlined />}
              size={EButtonSize.Large}
              onClick={zoomIn}
            />
            <IconButtonStyled
              type={EButtonType.Default}
              shape='default'
              icon={<ZoomOutOutlined />}
              size={EButtonSize.Large}
              onClick={zoomOut}
            />
          </Space>
        </div>
      )}
      <Space
        className={templateStringToClassName()({
          position: 'relative',
        })}
        block
        size={[0, 16]}
        direction={ESpaceDirection.Vertical}>
        <div>
          <ControlStyled>
            <div
              className={templateStringToClassName()({
                color: '#fff',
                display: 'flex',
                flexWrap: 'wrap',
              })}>
              <div>
                {t('choose_block.total_ticket')}{' '}
                <TotalSeatStyled>x{totalChooseSeat}</TotalSeatStyled>
              </div>
              {totalChooseSeat > 0 && (
                <SeeAllStyled onClick={handleSeeAll}>
                  &nbsp;({t('choose_block.see_all')})
                </SeeAllStyled>
              )}
            </div>
            <TotalPriceStyled>
              {formatCurrency(totalPrice)} {seatMap?.currency}
            </TotalPriceStyled>
          </ControlStyled>
        </div>

        <Row gutter={[8, 0]}>
          {isContinueBtn && (
            <Col span={12}>
              <LayoutBack.Action
                type={EButtonType.Default}
                disabled={!totalChooseSeat}
                block
                onClick={() => navigate('/')}>
                {t('button.continue')}
              </LayoutBack.Action>
            </Col>
          )}
          <Col span={isContinueBtn ? 12 : 24}>
            <LayoutBack.Action
              disabled={!totalChooseSeat}
              block
              onClick={handleSubmitTicket}>
              {t('button.buy')}
            </LayoutBack.Action>
          </Col>
        </Row>
      </Space>
    </ControlFooterStyled>
  );
}

export default SeatMapViewControl;
