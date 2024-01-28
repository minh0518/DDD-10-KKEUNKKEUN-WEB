import { ReactNode } from 'react';
import { create } from 'zustand';

/** 모달 데이터 타입*/
type ModalData = {
  /** 모달 컨텐츠 */
  children?: ReactNode;

  /** 취소버튼 클릭시 트리거되는 콜백 */
  onCancel?: () => unknown;

  /** submit버튼 클릭시 트리거되는 콜백 */
  onSubmit?: () => unknown;
};

/** 모달 스토어 타입 */
interface ModalStore {
  /** 모달 렌더링 유무 플래그 */
  isOpen: boolean;

  /** 모달 데이터를 기반으로 모달을 생성하는 함수 */
  openModal: (modalData: ModalData) => unknown;
  /** 모달을 닫는 함수 */
  closeModal: () => unknown;

  /** 모달창에 사용되는 모달 데이터 */
  modalData: ModalData;
}

// confirm용 모달 스토어
export const useConfirmModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalData: {} as ModalData,

  openModal: (modalData: ModalData) => {
    set((state) => ({ isOpen: true, modalData: { ...modalData } }));
  },

  closeModal: () => {
    set((state) => ({ isOpen: false, modalData: {} }));
  },
}));

// alert용 모달 스토어
export const useAlertModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalData: {} as ModalData,

  openModal: (modalData: ModalData) => {
    set((state) => ({ isOpen: true, modalData: { ...modalData } }));
  },

  closeModal: () => {
    set((state) => ({ isOpen: false, modalData: {} }));
  },
}));
