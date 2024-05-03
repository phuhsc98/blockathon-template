import 'konva/lib/shapes/Circle';
import 'konva/lib/shapes/Line';
import 'konva/lib/shapes/Rect';
import 'konva/lib/shapes/Transformer';
import 'konva/lib/shapes/Path';
import 'konva/lib/Container';

import { Container as KonvaContainer } from 'konva/lib/Container';
import { Text as KonvaText } from 'konva/lib/shapes/Text';
import { Label as KonvaLabel, Tag as KonvaTag } from 'konva/lib/shapes/Label';

export { KonvaLabel, KonvaTag, KonvaText, KonvaContainer };

export {
  Stage as ReactKonvaStage,
  Layer as ReactKonvaLayer,
  Group as ReactKonvaGroup,
  Rect as ReactKonvaRect,
  Circle as ReactKonvaCircle,
  Text as ReactKonvaText,
  Tag as ReactKonvaTag, //
  Label as ReactKonvaLabel,
  Line as ReactKonvaLine,
  Transformer as ReactKonvaTransformer,
  Path as ReactKonvaPath,
} from 'react-konva/lib/ReactKonvaCore';
