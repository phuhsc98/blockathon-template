import {
  CloseCircleOutlinedIcon,
  Icons,
  TicketIcon,
  styledComponent,
  templateStringToClassName,
} from '@front-end/common-ui';

import { useTheme } from '@front-end/hooks';

import { ISeat } from '@types';

type Props = {
  seat: ISeat;
  onClose?: () => void;
};

const StyledDiv = styledComponent('div')({
  color: '#141414',
  fontSize: 14,
  fontWeight: 700,
  position: 'relative',

  '.name': {
    position: 'absolute',
    left: 0,
    top: 0,
    paddingLeft: 10,
    width: 60,
    height: '100%',
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});

function ChooseTicketItem({ seat, onClose }: Props) {
  const theme = useTheme();
  return (
    <StyledDiv>
      <TicketIcon
        style={{
          color: theme['blue-6'],
          // fontSize: 50,
          // width: 16,
        }}
      />
      <span className='name'>{seat.name}</span>
      <Icons
        className={templateStringToClassName()({
          position: 'absolute',
          right: 0,
          top: 0,
          fontSize: '18px',
          transform: 'translate(-50%,7px)',
        })}
        color='#141414'
        component={CloseCircleOutlinedIcon}
        onClick={onClose}
      />
    </StyledDiv>
  );
}

export default ChooseTicketItem;
