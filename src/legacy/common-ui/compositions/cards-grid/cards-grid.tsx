import styled from '@emotion/styled/macro';

/* eslint-disable-next-line */
export interface CardsGridProps {}

const StyledCardsGrid = styled.div`
  color: pink;
`;

export function CardsGrid(props: CardsGridProps) {
  return (
    <StyledCardsGrid>
      <h1>Welcome to CardsGrid!</h1>
    </StyledCardsGrid>
  );
}

export default CardsGrid;
