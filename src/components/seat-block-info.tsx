import { useTheme } from '@front-end/hooks';
import useAppTranslation from '@hooks/use-app-translation/use-app-translation';
import {
  Col,
  Row,
  SoldSeatIcon,
  styledComponent,
  templateStringToClassName,
} from '@front-end/common-ui';
import { IBlockStats, ISeatBlock } from '@types';

interface Props {
  group: ISeatBlock;
  blockStats: IBlockStats;
}
const SquareComponent = styledComponent('div')(({ theme }) => ({
  borderRadius: theme.borderRadiusSM,
  width: 16,
  height: 16,
}));
const RowStyled = styledComponent(Row)({
  background: '#141414',
  padding: '8px 16px !important',
  margin: '0 !important',
  fontSize: '14px',
});
const ColStyled = styledComponent(Col)({
  background: '#141414',
  padding: '8px 0px !important',
  fontSize: '14px',
  display: 'flex !important',
  alignItems: 'center !important',
  '& > span': {
    marginLeft: '8px',
    color: '#BFBFBF',
    whiteSpace: 'nowrap',
  },
});

function SeatBlockInfo({ group, blockStats }: Props) {
  const theme = useTheme();
  const { t } = useAppTranslation('seat-maps-client');

  return (
    <RowStyled gutter={[8, 8]}>
      <Col span={24}>
        {t('detail.area_label')}:{' '}
        <span
          className={templateStringToClassName()({
            fontWeight: 700,
          })}>
          {group.name}
        </span>
      </Col>
      <Col span={24}>
        <Row align='middle'>
          <ColStyled span={8}>
            <SoldSeatIcon
              style={{
                color: '#262626',
                fontSize: 50,
                width: 16,
                flexShrink: 0,
              }}
            />
            <span>{t('detail.description.sold')}</span>
          </ColStyled>
          <ColStyled span={8}>
            <SquareComponent
              containerClass={templateStringToClassName()({
                backgroundColor: theme['blue-6'],
                flexShrink: 0,
              })}
            />

            <span>{t('detail.description.in_progress')}</span>
          </ColStyled>
          <ColStyled span={8}>
            <SquareComponent
              containerClass={templateStringToClassName()({
                backgroundColor: '#262626',
                flexShrink: 0,
              })}
            />
            <span>
              {blockStats.available > 0
                ? `${t('detail.description.last')} ${blockStats.available}`
                : t('detail.description.sold_out')}
            </span>
          </ColStyled>
        </Row>
      </Col>
    </RowStyled>
  );
}

export default SeatBlockInfo;
