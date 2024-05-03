import {
  IGroup,
  ReactKonvaGroup,
  ReactKonvaRect,
  ReactKonvaText,
} from '@front-end/common-ui';

import { useMemo, useRef } from 'react';
import { DEFAULT_AREA_COLOR } from '@constants';
import { ISeatBlock } from '@types';

import TextWithBackGround from './text-with-background';
import { isLightColor } from '@utils/color';

interface Props {
  group: ISeatBlock;
  handleClickSeatBlock?: (data: ISeatBlock) => void;
  isShowTotal?: boolean;
}

function SeatBlockItem({ group, handleClickSeatBlock, isShowTotal }: Props) {
  const groupRef = useRef<IGroup>(null);

  const isLightBackGround = useMemo(
    () => isLightColor(group.color),
    [group?.color]
  );
  const fillTextColor = isLightBackGround ? 'black' : 'white';
  // const strokeColor = isLightBackGround ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';

  function handleSelect() {
    handleClickSeatBlock?.(group);
  }
  // useEffect(() => {
  //   if (groupRef.current) {
  //     groupRef.current.cache();
  //   }
  // }, [group]);

  const fontSize = group.width * 0.04;
  const fontSizeLabel = fontSize * 0.75;
  return (
    <ReactKonvaGroup
      ref={groupRef}
      name={group.id}
      strokeScaleEnabled={false}
      width={group.width}
      height={group.height}
      x={group.position?.x}
      y={group.position?.y}
      onTap={handleSelect}
      onClick={handleSelect}
      rotation={group.rotation}>
      <ReactKonvaRect
        width={group.width}
        height={group.height}
        x={0}
        y={0}
        strokeScaleEnabled={false}
        perfectDrawEnabled={true}
        fill={group.color || DEFAULT_AREA_COLOR}
      />
      {group.name && (
        <ReactKonvaText
          listening={false}
          hitStrokeWidth={0}
          width={group.width}
          align='center'
          verticalAlign='center'
          y={group.height / 2 - fontSize / 2}
          fill={fillTextColor}
          fontSize={fontSize < 16 ? 16 : fontSize}
          text={group.name}
        />
      )}
      {(isShowTotal || group.stats?.available === 0) && (
        <TextWithBackGround
          originTopRight
          x={group.width - 5}
          y={5}
          text={
            (group.stats?.available || 0) > 0
              ? group.stats?.available || 0
              : 'Hết vé'
          }
          fontSize={fontSizeLabel < 12 ? 12 : fontSizeLabel}
        />
      )}
    </ReactKonvaGroup>
  );
}

export default SeatBlockItem;
