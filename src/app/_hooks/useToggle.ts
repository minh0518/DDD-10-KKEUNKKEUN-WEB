import { useCallback, useState } from 'react';

export interface ToggleType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/** 특정 컴포넌트 노출 여부를 토글하는 훅
 *
 * - isOpen: 노출 여부
 * - onOpen: 컴포넌트를 노출 시키는 함수
 * - onOpen: 컴포넌트를 미노출 시키는 함수
 */
const useToggle = (): ToggleType => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, onOpen, onClose };
};

export default useToggle;
