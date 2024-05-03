import { ReactKonvaGroup, ReactKonvaPath, ReactKonvaText } from '@front-end/common-ui';

type Props = {
  // x: number;
  // y: number;
  name?: string;
};

function SeatMapStage({ name }: Props) {
  return (
    <ReactKonvaGroup x={400} y={10}>
      <ReactKonvaPath
        data="M328.503 0.00379223L362.723 0.00393677L250.723 81.3767L112.283 81.3767L0.283081 0.00392092L34.0029 0.00390714L91.5029 0.00394017L168.003 0.00394351L240.503 0.00390091L293.503 0.00390322L328.503 0.00379223Z"
        fill="#262626"
      />

      <ReactKonvaText
        listening={false}
        hitStrokeWidth={0}
        width={362}
        y={35}
        align="center"
        verticalAlign="center"
        // y={group.height / 2 - fontSize / 2}
        fill="#fff"
        fontSize={20}
        text="SCREEN"
      />
    </ReactKonvaGroup>
  );
}

export default SeatMapStage;
