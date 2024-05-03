import { EBreakpoint, TBreakpoint } from './EBreakpoint';

export type Gutter = number | undefined | Partial<Record<TBreakpoint, number>> | { [key in EBreakpoint]: number };
