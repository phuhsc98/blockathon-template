import { useCallback } from 'react';

import { noobj } from '@front-end/core';

import useState from '../use-state/use-state';

export interface UseDisclosureProps {
  initialState?: boolean;
}

export interface UserDisclosure {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  onToggle: (toState?: boolean) => void;
}

/**
 * `useDisclosure` is a custom hook used to help handle common open, close, or toggle scenarios
 */
export const useDisclosure = ({
  initialState,
}: UseDisclosureProps = noobj): UserDisclosure => {
  const [open, setOpen] = useState<boolean>(() => !!initialState);

  const onOpen = useCallback(() => setOpen(true), []);

  const onClose = useCallback(() => setOpen(false), []);

  const onToggle = useCallback((toState?: boolean) => {
    setOpen((open) => (toState === undefined ? !open : !!toState));
  }, []);

  return { open: !!open, onClose, onOpen, onToggle };
};

export default useDisclosure;
