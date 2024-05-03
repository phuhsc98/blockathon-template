import { useEffect, useRef } from 'react';

import {
  ILabel,
  KonvaTag,
  KonvaText,
  ReactKonvaLabel,
} from '@front-end/common-ui';

type TextWithBackGroundProps = {
  text: string | number;
  padding?: number | string;
  fontSize?: number;
  bgColor?: string;
  textColor?: string;
  x?: number;
  y?: number;
  originTopRight?: boolean;
};

function TextWithBackGround({
  text,
  fontSize = 12,
  bgColor = 'rgba(255, 255, 255, 0.5)',
  textColor = 'rgba(0, 0, 0, 0.85)',
  x,
  y,
  originTopRight,
}: TextWithBackGroundProps) {
  const labelRef = useRef<ILabel>(null);

  useEffect(() => {
    const currentLabel = labelRef.current;

    if (currentLabel) {
      currentLabel.removeChildren();
      const tagKonva = new KonvaTag({
        fill: bgColor,
        cornerRadius: 1,
        shadowColor: 'rgba(0, 0, 0)',
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        shadowBlur: 8,
        shadowOpacity: 0.15,
      });
      currentLabel.add(tagKonva);

      const textKonva = new KonvaText({
        text: `${text}`,
        fontFamily: 'Roboto ,sans-serif',
        fontSize: fontSize,
        fill: textColor,
        align: 'center',
        lineHeight: 1.1,
      });
      currentLabel.add(textKonva);
      textKonva.width(textKonva.width() + 2); // Cheat for paddingX

      if (originTopRight) {
        tagKonva.offsetX(textKonva.width() + 2);
        textKonva.offsetX(textKonva.width() + 2);
      }
    }
  }, [text]);

  return <ReactKonvaLabel ref={labelRef} x={x} y={y} opacity={0.75} />;
}

export default TextWithBackGround;
