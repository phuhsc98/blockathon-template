// import { IRect as ICoordRect } from 'konva/lib/types';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { Group } from 'konva/lib/Group';
import { Text as IKonvaText } from 'konva/lib/shapes/Text';
import { Rect as IKonvaRect } from 'konva/lib/shapes/Rect';
import { Circle as IKonvaCircle } from 'konva/lib/shapes/Circle';
import { Label as IKonvaLabel } from 'konva/lib/shapes/Label';
import { Transformer as IKonvaTransformer } from 'konva/lib/shapes/Transformer';
export type IStage = Stage;
export type ILayer = Layer;
export type IGroup = Group;
export type IText = IKonvaText;
export type IRect = IKonvaRect;
export type ICircle = IKonvaCircle;
export type ILabel = IKonvaLabel;
export type ITransformer = IKonvaTransformer;

export type { IRect as ICoordRect } from 'konva/lib/types';
export type { KonvaEventObject } from 'konva/lib/Node';

export { Util as KonvaUtil } from 'konva/lib/Util';
