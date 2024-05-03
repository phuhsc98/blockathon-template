import { noobj } from '@front-end/core';
import { useCallback, useMemo } from 'react';
import useRef from '../use-ref/use-ref';
import useState from '../use-state/use-state';

type TToggle = (_open?: boolean) => void;
type TCancel = (_toggle: TToggle) => boolean;
const noop = (_toggle: TToggle) => true;

export interface UseModalProps {
  isOpen?: boolean;
  onCancel?: TCancel;
}

export interface UseModal {
  config?: object;
  toggle?: TToggle;
}

export function useModal(options: UseModalProps = noobj): UseModal {
  const { isOpen = false, onCancel = noop } = options;
  const _onCancel = useRef<TCancel>(onCancel);
  _onCancel.current = onCancel;
  const [open, setOpen] = useState<boolean>(isOpen);

  const toggle = useCallback<TToggle>(
    (_open: unknown) =>
      setOpen((opened?: boolean) => (_open === undefined ? !opened : !!_open)),
    [setOpen]
  );

  const cancel = useCallback(
    () =>
      _onCancel.current === noop ? setOpen(false) : _onCancel.current?.(toggle),
    [toggle]
  );

  const config = useMemo(() => {
    return {
      open,
      onCancel: cancel,
    };
  }, [open, cancel]);

  return { config, toggle };
}
