import { styledComponent } from '@front-end/common-ui';

import ChooseTicketItem from './choose-ticket-item';
import { ISeat } from '@types';

type Props = {
  chooseSeats: ISeat[];
  handleRemoveSeat: (seatData: ISeat) => () => void;
};

const StyledDiv = styledComponent('div')({
  width: '100%',
  height: 48,
  display: 'flex',
  flexWrap: 'nowrap',
  gap: 16,
  overflowX: 'auto',
  paddingBottom: 16,
});

function ChooseTicketList({ chooseSeats, handleRemoveSeat }: Props) {
  return (
    <StyledDiv>
      {chooseSeats.map((item) => (
        <ChooseTicketItem
          onClose={handleRemoveSeat(item)}
          key={item.id}
          seat={item}
        />
      ))}
    </StyledDiv>
  );
}

export default ChooseTicketList;
