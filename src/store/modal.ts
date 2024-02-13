import { ReactNode } from 'react';
import { create } from 'zustand';

/** 모달창에 사용되는 데이터 타입*/
export type ModalData = {
  /** 모달창 내부에 사용되는 컨텐츠 */
  content?: ReactNode;

  /** 취소버튼 관련 데이터(이벤트 콜백, 버튼 컨텐츠)*/
  onCancelButton?: ReactNode;

  /** submit버튼 관련 데이터(이벤트 콜백, 버튼 컨텐츠)*/
  onSubmitButton?: ReactNode;
};

/** 모달 스토어 타입 */
interface ModalStore {
  /** 현재 모달 렌더링 유무 플래그 */
  isOpen: boolean;

  /** 인자로 받은 모달 데이터를 기반으로 모달을 생성하는 함수 */
  openModal: (modalData: ModalData) => unknown;

  /** 모달을 닫는 함수(DOM에서 제거) */
  closeModal: () => unknown;

  /** 모달창에 사용되는 데이터 */
  modalData: ModalData;
}

/** 토스트창에 사용되는 데이터 타입*/
export type ToastData = {
  /** 토스트창 컨텐츠 */
  content?: ReactNode;
};

/** 토스트 스토어 타입 */
interface ToastStore {
  /** 현재 토스트 렌더링 유무 플래그 */
  isOpen: boolean;

  /** 인자로 받은 토스트 데이터를 기반으로 토스트를 생성하는 함수 */
  openToast: (toastData: ToastData) => unknown;

  /** 토스트를 닫는 함수(DOM에서 제거) */
  closeToast: () => unknown;

  /** 토스트창에 사용되는 데이터 */
  toastData: ToastData;
}

/** confirm과 alert에 사용되는 스토어 */
export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalData: {} as ModalData,

  openModal: (modalData: ModalData) => {
    set((state) => ({ isOpen: true, modalData: { ...modalData } }));
  },

  closeModal: () => {
    set((state) => ({ isOpen: false, modalData: {} }));
  },
}));

/** toast에 사용되는 스토어 */
export const useToastStore = create<ToastStore>((set) => ({
  isOpen: false,
  toastData: {} as ToastData,

  openToast: (toastData: ToastData) => {
    set((state) => ({ isOpen: true, toastData: { ...toastData } }));
  },

  closeToast: () => {
    set((state) => ({ isOpen: false, toastData: {} }));
  },
}));
