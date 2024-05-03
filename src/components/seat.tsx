import { Vector2d } from 'konva/lib/types';
import { memo, useEffect, useMemo, useRef } from 'react';

import {
  IGroup,
  IRect,
  ReactKonvaGroup,
  ReactKonvaLine,
  ReactKonvaPath,
  ReactKonvaRect,
  ReactKonvaText,
} from '@front-end/common-ui';
import { ELEMENT_NAME, PADDING_SEAT, SIZE_SEAT } from '@constants';

import { useTheme } from '@front-end/hooks';
import { ESeatStatus, ISeat, ISeatBlock, ISeatStatus } from '@types';

export interface ISeatProps extends Vector2d {
  id: string;
  status?: ISeatStatus;
  name?: string;
  size?: number;
  padding?: number;
  groupID?: string;
  isVisible?: boolean;
  fillColor?: string;
  seatInfo?: ISeat;
  seatBlock?: ISeatBlock;
  isSelected?: boolean;
  isBlank?: boolean;
}

function calcRadiusBySize(value: number, padding: number) {
  return (value - padding * 2) / 2;
}

function Seat({
  id,
  name,
  x,
  y,
  size = SIZE_SEAT,
  padding = PADDING_SEAT,
  isVisible,
  fillColor,
  seatInfo,
  seatBlock,
  isSelected,
  status,
}: ISeatProps) {
  const containerRef = useRef<IGroup>(null);
  const seatShapeRef = useRef<IRect>(null);
  const theme = useTheme();

  const radius = calcRadiusBySize(size, padding);
  const seatScale = (radius * 2) / 32;

  const fontSize = size * (16 / 24);

  function reCache() {
    if (containerRef.current) {
      containerRef.current.cache({
        pixelRatio: 5,
      });
      // containerRef.current.getParent()?.clearCache();
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      reCache();
    }
  }, [isSelected, fillColor, status]);

  useEffect(() => {
    const currentSeatRef = seatShapeRef.current;
    if (seatInfo && seatBlock && currentSeatRef) {
      const { seatsList, ...rest } = seatBlock || {};
      currentSeatRef.setAttrs({
        seatInfo,
        seatBlock: rest,
      });
    }
  }, [status]);

  const isSold = useMemo(() => {
    if (status !== ESeatStatus.SEAT_STATUS_AVAILABLE) {
      return true;
    }
    return false;
  }, [status]);

  // const seatStyled2 = useMemo<{
  //   textColor: string;
  //   fillColor: string;
  //   strokeColor: string;
  // }>(() => {
  //   if (isSold) {
  //     return {
  //       textColor: '#595959',
  //       fillColor: '',
  //       strokeColor: '#262626',
  //     };
  //   }

  //   if (isSelected) {
  //     return {
  //       textColor: '#141414',
  //       fillColor: theme['blue-6'],
  //       strokeColor: theme['blue-6'],
  //     };
  //   }

  //   return {
  //     textColor: '#595959',
  //     fillColor: '#262626',
  //     strokeColor: '#262626',
  //   };
  // }, [isSold, isSelected]);

  const seatStyled = (() => {
    if (isSold) {
      return {
        textColor: '#595959',
        fillColor: '',
        strokeColor: '#262626',
      };
    }

    if (isSelected) {
      return {
        textColor: '#141414',
        fillColor: theme['blue-6'],
        strokeColor: theme['blue-6'],
      };
    }

    return {
      textColor: '#595959',
      fillColor: '#262626',
      strokeColor: '#262626',
    };
  })();

  return (
    <ReactKonvaGroup
      visible={isVisible}
      x={x + padding}
      y={y + padding}
      scaleX={seatScale}
      scaleY={seatScale}
      ref={containerRef}
      strokeScaleEnabled={false}
      // name={id}
      name={ELEMENT_NAME.SEAT}>
      <ReactKonvaRect
        ref={seatShapeRef}
        width={(radius * 2) / seatScale}
        height={(radius * 2) / seatScale}
        listening
        strokeScaleEnabled={false}
      />
      <ReactKonvaLine
        listening={false}
        visible={isSold}
        strokeWidth={1}
        points={[3.2871, 2.59065, 31.2871, 22.2287]}
        stroke={seatStyled.strokeColor}
      />
      <ReactKonvaLine
        listening={false}
        visible={isSold}
        strokeWidth={1}
        points={[1.00808, 22.5946, 28.7068, 2.59463]}
        stroke={seatStyled.strokeColor}
      />

      <ReactKonvaPath
        listening={false}
        data='M8 0.5H24C28.1421 0.5 31.5 3.85786 31.5 8V20C31.5 21.933 29.933 23.5 28 23.5H4C2.067 23.5 0.5 21.933 0.5 20V8C0.5 3.85786 3.85786 0.5 8 0.5Z'
        fill={seatStyled.fillColor}
        strokeWidth={1}
        stroke={seatStyled.strokeColor}
      />
      <ReactKonvaPath
        listening={false}
        data='M5.66667 26.5H26.3333C26.9777 26.5 27.5 27.0223 27.5 27.6667C27.5 29.2315 26.2315 30.5 24.6667 30.5H7.33333C5.76853 30.5 4.5 29.2315 4.5 27.6667C4.5 27.0223 5.02233 26.5 5.66667 26.5Z'
        fill={seatStyled.fillColor}
        strokeWidth={1}
        stroke={seatStyled.strokeColor}
      />
      {name && (
        <ReactKonvaText
          listening={false}
          hitStrokeWidth={0}
          width={(radius * 2) / seatScale}
          height={size / seatScale}
          align='center'
          verticalAlign='center'
          x={0}
          y={(name?.length || 0) > 3 ? fontSize * 0.85 : fontSize * 0.75} // hardcode center
          fontSize={(name?.length || 0) > 3 ? fontSize * 0.75 : fontSize}
          text={name}
          fill={seatStyled.textColor}
        />
      )}
    </ReactKonvaGroup>
  );
}
export default memo(Seat);
// export default memo(Seat, (prevProps, nextProps) => {
//   if (
//     prevProps.isSelected !== nextProps.isSelected ||
//     prevProps.fillColor !== nextProps.fillColor ||
//     prevProps.status !== nextProps.status
//   ) {
//     return false;
//   }

//   return true;
// });
