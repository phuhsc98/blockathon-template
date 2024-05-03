import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, styledComponent } from '@front-end/common-ui';
import { EButtonSize, EButtonType } from '@front-end/core';

type Props = {
  quantity: number;
  onChange: (value: number) => void;
  size?: EButtonSize;
  maxValue?: number;
};

const QuantityControlStyled = styledComponent('div')`
.buttonQuantity {
  display: inline-flex;
  
  height: 32px;

  align-items: center;
  justify-content: space-between;
  
  &__quantity {
    font-size: 14px;
    width: 40px;
    text-align: center;
  }
}
`;

export function QuantityControl({
  size = EButtonSize.Middle,
  maxValue = Infinity,
  onChange,
  quantity,
}: Props) {
  return (
    <QuantityControlStyled>
      <div className='buttonQuantity'>
        <Button
          shape='default'
          type={EButtonType.Default}
          size={size}
          className='buttonQuantity__action buttonQuantity__action--decrease'
          disabled={quantity === 0}
          onClick={() => {
            // setQuantity((prevState) => prevState - 1);
            onChange(quantity - 1);
          }}
          icon={<MinusOutlined style={{ fontSize: 12 }} />}
        />

        <span className='buttonQuantity__quantity'>{quantity}</span>
        <Button
          type={EButtonType.Default}
          shape='default'
          size={size}
          className='buttonQuantity__action buttonQuantity__action--increase'
          onClick={() => {
            // setQuantity((prevState) => prevState + 1);
            onChange(quantity + 1);
          }}
          icon={<PlusOutlined style={{ fontSize: 12 }} />}
          disabled={quantity >= maxValue}
        />
      </div>
    </QuantityControlStyled>
  );
}

export default QuantityControl;
