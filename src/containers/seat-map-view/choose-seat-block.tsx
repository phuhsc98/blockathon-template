import {
  Button,
  Col,
  Divider,
  FormWithLabel,
  Modal,
  Row,
  Text,
  styledComponent,
  templateStringToClassName,
} from '@front-end/common-ui';
import { EBaseType, message } from '@front-end/core';
import { EButtonType, EModalWidth, formatCurrency } from '@front-end/core';

import { useEffect, useMemo, useState } from 'react';
import { IChooseSeatBlock } from '@contexts/client/choose-seat-block-context';
import useChooseSeatBlock from '@hooks/use-choose-seat-block-context';
import useSeatMapClient from '@hooks/use-seat-map-client';
import useSeatMapViewClient from '@hooks/use-seat-map-view-client';

import QuantityControl from '@compositions/quantity-control';
import useAppTranslation from '@hooks/use-app-translation/use-app-translation';

type Props = {
  //
};

const ModalContentStyled = styledComponent('div')({
  marginTop: 16,
});

const FormWithLabelStyled = styledComponent('div')({
  marginBottom: 40,
  label: {
    color: '#8C8C8C',
  },
  '.content': {
    textAlign: 'right',
  },
});

function ChooseSeatBlock(props: Props) {
  const { seatMap, showTotalSeat } = useSeatMapClient();
  const { t } = useAppTranslation('seat-maps-client');
  const { listChooseSeatBlock, updateSeatBlock, totalChooseSeat } =
    useChooseSeatBlock();
  const {
    isOpenChooseSeatBlock,
    setIsOpenChooseSeatBlock,
    chooseSeatGroup,
    handlePickSeatArea,
  } = useSeatMapViewClient();
  const [isNotiShow, setIsNotiShow] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  // const [requireUpdateQuantity, setRequireUpdateQuantity] = useState(false);

  const currentEditChooseSeatBlock = useMemo<IChooseSeatBlock | null>(() => {
    if (!chooseSeatGroup) {
      return null;
    }

    return (
      listChooseSeatBlock.find((item) => item.info.id === chooseSeatGroup.id) ||
      null
    );
  }, [chooseSeatGroup]);

  const totalAvailable = chooseSeatGroup?.stats?.available || 0;

  function handleClose() {
    if (quantity <= totalAvailable) {
      setIsOpenChooseSeatBlock(false);
      handlePickSeatArea();
      setQuantity(0);
    }
  }

  function handleChangeQuantity(value: number) {
    setQuantity(value);
  }

  function handleSubmit() {
    if (chooseSeatGroup && seatMap) {
      // // !HARDCODE FOR TECHPASS UPDATE LATER
      const currentTotal = currentEditChooseSeatBlock?.total || 0;
      if (totalChooseSeat + quantity - currentTotal > seatMap.maxSeatPerOrder) {
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

      updateSeatBlock(quantity, chooseSeatGroup);
      handleClose();
    }
  }

  useEffect(() => {
    if (isOpenChooseSeatBlock && chooseSeatGroup) {
      if (currentEditChooseSeatBlock) {
        setQuantity(currentEditChooseSeatBlock.total);
      } else {
        setQuantity((chooseSeatGroup.stats?.available || 0) > 0 ? 1 : 0);
      }
    }
  }, [isOpenChooseSeatBlock, chooseSeatGroup, currentEditChooseSeatBlock]);

  return (
    <Modal
      width={EModalWidth.ExtraSuperSmall}
      title={t('choose_block.header')}
      open={isOpenChooseSeatBlock}
      onCancel={handleClose}
      footer={null}
      destroyOnClose>
      <ModalContentStyled>
        {chooseSeatGroup?.id && (
          <FormWithLabelStyled>
            <Row>
              <Col span={24}>
                <Divider
                  className={templateStringToClassName()`margin: 0px !important`}
                />
              </Col>
              <Col span={24}>
                <FormWithLabel
                  col={[12, 12]}
                  label={t('choose_seat_block.name')}>
                  {chooseSeatGroup.name || '...'}
                </FormWithLabel>
              </Col>
              <Col span={24}>
                <FormWithLabel
                  col={[12, 12]}
                  label={t('choose_seat_block.price')}>
                  {formatCurrency(chooseSeatGroup.price)} {seatMap?.currency}
                </FormWithLabel>
              </Col>
              {showTotalSeat && (
                <Col span={24}>
                  <FormWithLabel
                    col={[12, 12]}
                    label={t('choose_seat_block.total_available')}>
                    {totalAvailable > 0
                      ? t('choose_seat_block.total_ticket', {
                          total: totalAvailable,
                        })
                      : t('detail.description.sold_out')}
                  </FormWithLabel>
                </Col>
              )}
              <Col span={24}>
                <Divider
                  className={templateStringToClassName()`margin: 8px 0px 16px 0px !important`}
                />
              </Col>

              <Col span={24}>
                <FormWithLabel
                  col={[12, 12]}
                  label={t('choose_seat_block.total')}>
                  <QuantityControl
                    quantity={quantity}
                    onChange={handleChangeQuantity}
                    maxValue={totalAvailable}
                  />
                </FormWithLabel>
              </Col>
              {quantity > totalAvailable && (
                <Col span={24}>
                  <Text type={EBaseType.Danger}>
                    {t('choose_seat_block.need_update_status')}
                  </Text>
                </Col>
              )}
            </Row>
          </FormWithLabelStyled>
        )}
        <Button
          disabled={
            (!currentEditChooseSeatBlock && quantity === 0) ||
            quantity > totalAvailable
          }
          onClick={handleSubmit}
          block
          type={EButtonType.Primary}>
          {t(`button.${currentEditChooseSeatBlock ? 'update' : 'choose'}`)}
        </Button>
      </ModalContentStyled>
    </Modal>
  );
}

export default ChooseSeatBlock;
