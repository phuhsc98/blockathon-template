import { Vector2d } from 'konva/lib/types';

export interface ICoordShape extends Vector2d {
  width: number;
  height: number;
}

export interface ISelectionRect extends ICoordShape {
  visible: boolean;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface ISeatGroupForm {
  total: number;
  paperReserved: number;
  beginCharacterRows: string;
  beginCharacterCols: string;
}

export interface IArea {
  id: string;
  name: string;
  color: string;
  price: number;
  currency: string;
}
export interface IAreaForm extends IArea {
  //
}

export * from './seatmap';
export * from './common';
export * from './TLanguageNS';
export * from './ws-listener';
export * from './ws-seatmap';
