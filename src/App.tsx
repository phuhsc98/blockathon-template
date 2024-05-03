import styled from '@emotion/styled/macro';

import { ChooseSeatBlockContextProvider } from './contexts/client/choose-seat-block-context';
import { SeatMapClientContextProvider } from './contexts/client/seat-map-client-context';

import { Route, Routes } from 'react-router-dom';
import { SeatMapDetail, SeatMapView } from './containers';
import { HIDE_SHOW_TOTAL_AVAILABLE } from '@constants';

const StyledApp = styled.div`
  // Your style here
  -webkit-user-select: none; /* Safari */
  -webkit-touch-callout: none; /* IOS Safari */
  -moz-user-select: none; /* Mozilla Firefox: */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
`;

export function App() {
  return (
    <StyledApp>
      <ChooseSeatBlockContextProvider>
        <SeatMapClientContextProvider
          showTotalSeat={!HIDE_SHOW_TOTAL_AVAILABLE}>
          <Routes>
            <Route path='/' element={<SeatMapView />} />
            <Route path='/:id' element={<SeatMapDetail />} />
          </Routes>
        </SeatMapClientContextProvider>
      </ChooseSeatBlockContextProvider>
    </StyledApp>
  );
}

export default App;
