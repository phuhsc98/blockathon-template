import { styledComponent } from '../../styled/styled';
import { default as CustomTable } from './table';

const StyledTable = styledComponent(CustomTable)``;

// type TTable = RefTable & {
//   SELECTION_COLUMN: typeof SELECTION_COLUMN;
//   EXPAND_COLUMN: typeof EXPAND_COLUMN;
//   SELECTION_ALL: 'SELECT_ALL';
//   SELECTION_INVERT: 'SELECT_INVERT';
//   SELECTION_NONE: 'SELECT_NONE';
//   Column: typeof Column;
//   ColumnGroup: typeof ColumnGroup;
//   Summary: typeof Summary;
// }

export function Table(props: any) {
  return <StyledTable {...props} />;
}

export default Table;
