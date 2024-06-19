'use client';

import useToggle from '@/app/_hooks/useToggle';
import styles from './page.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import useRecorder from '../_hooks/useRecorder';
import Alert from '@/app/_components/_modules/_modal/Alert';
import SpeechBubble from '@/app/_components/_modules/SpeechBubble';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PracticeDetail, SavePracticeParams } from '@/types/service';
import { PracticeService } from '@/services/client/practice';
import Image from 'next/image';
import PracticeNav from '../_components/PracticeNav';
import Confirm from '@/app/_components/_modules/_modal/Confirm';
import NextSlideConfirm from '../_components/NextSlideConfirm';
import { useRouter } from 'next/navigation';
import { FileService } from '@/services/client/file';
import { FieldValues, useForm } from 'react-hook-form';
import { CDN_BASE_URL } from '@/config/path';
import LastSlide from '../_components/LastSlide';

export default function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const router = useRouter();

  // #region state
  const [slideSeq, setSlideSeq] = useState(0); // INFO: 슬라이드 순서
  const [saveMemo, setSaveMemo] = useState('');

  const alert = useToggle(); // INFO: 마이크 권한 체크
  const confirm = useToggle(); // INFO: 연습 중단 확인
  const modal = useToggle(); // INFO: 다음 슬라이드 이동 확인
  const bubble = useToggle();
  const recorder = useRecorder();
  // #endregion

  //
  const cx = classNames.bind(styles);

  // #region query
  const { isLoading, data } = useQuery<PracticeDetail>({
    queryKey: ['practice', id],
    queryFn: () => PracticeService.getPracticeDetail(Number(id)),
  });

  /** 발표 이름 */
  const title = data?.title ?? '';

  /** 발표 시간 */
  const timeLimit = data?.timeLimit ?? { hours: 0, minutes: 0 };

  /** 슬라이드 페이징 문자열 */
  const slidePaging = `${slideSeq + 1}/${data?.slides.length ?? 0}`;

  /** 마지막 슬라이드 여부 */
  const isLastSlide = data?.slides.length === slideSeq + 1;

  /** 모달 노출 여부
   * TODO: 이렇게 해도 로직상 문제 없는지는 확인 필요
   */
  const isActiveModal = data?.activateNextSlideModal ?? true;

  /** 슬라이드 아이디 */
  const slideIdx = data?.slides[slideSeq].id ?? 0;
  const curMemo = data?.slides[slideSeq].memo ?? '';
  // #endregion

  // #region mutation
  const modalMutation = useMutation({
    mutationKey: ['deactive-modal'],
    mutationFn: () => PracticeService.patchDeactiveModal(),
    onError: (error) => {
      console.log(error.message);
    },
  });

  const slideMutation = useMutation({
    mutationKey: ['slide', slideIdx],
    mutationFn: ({ id, data }: { id: number; data: SavePracticeParams }) =>
      PracticeService.patchSlide(id, data),
    onError: (error) => {
      console.log(error.message);
    },
  });
  // #endregion

  useEffect(() => {
    alert.onOpen();
    recorder.processPermission();
  }, []);

  useEffect(() => {
    recorder.getMedia();
    recorder.startRecording();

    reset({
      content: curMemo,
    });
  }, [slideSeq]);

  useEffect(() => {
    savePractice();
  }, [recorder.audioBlob]);

  // #region event-handler
  /** 마이크 권한 체크 얼럿 액션 핸들러 */
  const handleAlertAction = () => {
    recorder.startRecording();
    alert.onClose();
    bubble.onOpen();
  };

  /** '다음 페이지' 버튼 클릭 이벤트 */
  const onClickNextPage = () => {
    if (isLastSlide) {
      // router.push(`/feedback/${id}`);
      savePractice();
      router.push(`/feedback/list`);
    }

    if (isActiveModal) {
      modal.onOpen();
    } else {
      goToNextSlide();
    }
  };

  /** 다음 슬라이드 이동 컴펌 okay 핸들러 */
  const handleConfirmOkay = (checked: boolean) => {
    goToNextSlide();

    if (checked) {
      modalMutation.mutate();
      // setIsActiveModal(false);
    }
  };

  /** 녹음 일시정지 및 재개 핸들러 */
  const handleRecordingPause = () => {
    if (recorder.isRecording) recorder.pauseRecording();
    else recorder.resumeRecording();
  };

  /** 닫기 버튼 클릭 이벤트 */
  const onCloseClick = () => {
    confirm.onOpen();
  };
  // #endregion

  // #region function
  /** 다음 슬라이드 이동 함수 */
  const goToNextSlide = () => {
    if (isLastSlide) return;

    if (modal.isOpen) modal.onClose();

    recorder.stopRecording();

    setSaveMemo(content);
    setSlideSeq((prev) => prev + 1);
  };

  /** 발표 목록 페이지 이동 함수 */
  const goToPresentationsPage = () => {
    router.push('/home');
  };

  /** 발표 연습 저장 함수 (슬라이드 별) */
  const savePractice = async () => {
    const audioBlob = recorder.audioBlob;

    if (audioBlob?.size) {
      const { id, path } = await FileService.fileUpload(
        audioBlob as Blob,
        `practice_${slideSeq}.mp3`,
      );

      const param = {
        memo: saveMemo,
        audioFileId: id,
      };

      slideMutation.mutate({
        id: slideIdx,
        data: param,
      });
    }
  };
  // #endregion

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      content: data?.slides[slideSeq].memo ?? '',
    },
  });
  const content = watch('content') || '';

  const onSubmit = (data: FieldValues) => {
    // console.log('??????', data);
  };

  return (
    // CDN주소(src={`${CDN_BASE_URL}...})에 undefined포함 방지
    data && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <PracticeNav
          title={title}
          isRecording={recorder.isRecording}
          isLastSlide={isLastSlide}
          practiceTime={timeLimit}
          goToNext={onClickNextPage}
          handleRecording={handleRecordingPause}
          onCloseClick={onCloseClick}
        />
        <div className={styles.container}>
          <div className={styles.contents}>
            <section className={styles.presentation__box}>
              <article className={styles.presentation}>
                <Image
                  src={`${CDN_BASE_URL}${data?.slides[slideSeq].imageFilePath}`}
                  alt={`slide-${slideSeq}`}
                  width={900}
                  height={510}
                  style={{ objectFit: 'contain', borderRadius: '16px' }}
                />
              </article>
              <section className={styles.helper__box}>
                <article className={styles.helper}>
                  <h4 className={styles.helper__title}>
                    다음 슬라이드
                    <span className={cx(['helper__subtitle', 'helper__subtitle--next'])}>
                      {slidePaging}
                    </span>
                  </h4>
                  <div className={styles.helper__item}>
                    {isLastSlide ? (
                      <div className={styles.lastSlide}>
                        <LastSlide />
                      </div>
                    ) : (
                      <Image
                        src={`${CDN_BASE_URL}${data?.slides[slideSeq + 1].imageFilePath}`}
                        alt={`slide-${slideSeq + 1}`}
                        width={375}
                        height={210}
                        style={{ objectFit: 'contain', borderRadius: '16px' }}
                      />
                    )}
                  </div>
                </article>
                <article className={styles.helper}>
                  <h4 className={styles.helper__title}>
                    메모하기
                    {recorder.isRecording ? (
                      <span
                        className={cx(['helper__subtitle', 'helper__subtitle--memo', 'recording'])}
                      >
                        발표 연습 중 메모를 입력하면 녹음이 일시정지돼요.
                      </span>
                    ) : (
                      <span
                        className={cx(['helper__subtitle', 'helper__subtitle--memo', 'pausing'])}
                      >
                        녹음을 이어서 하시려면 녹음 버튼을 눌러주세요.
                      </span>
                    )}
                  </h4>
                  <button
                    className={styles.helper__recorder}
                    disabled={recorder.isRecording}
                    onClick={handleRecordingPause}
                  >
                    녹음 재개
                  </button>
                  <textarea
                    {...register('content', {
                      required: true,
                      maxLength: 10,
                      onChange: () => {
                        recorder.pauseRecording();
                      },
                    })}
                    className={styles.helper__item}
                    placeholder="ex. 발표문 수정 사항, 목소리 크기 등에 대한 메모를 작성해 주세요."
                  />
                  {errors.content && errors.content.type === 'maxLength' ? (
                    <span className={cx(['memo-validation', 'memo-validation--error'])}>
                      {content.length} / 500
                    </span>
                  ) : (
                    <span className={cx(['memo-validation'])}>{content.length} / 500</span>
                  )}
                </article>
              </section>
            </section>
            <article className={styles.script__box}>
              <p className={styles.script}>{data?.slides[slideSeq].script ?? ''}</p>
            </article>
          </div>
        </div>
        <Alert
          context={alert}
          title="마이크 권한을 허용해주세요."
          message="권한을 허용해야 발표 연습을 하실 수 있어요!"
          actionText="연습 시작하기"
          isDisabled={!recorder.isPermitted}
          onActionClick={handleAlertAction}
        />
        <Confirm
          context={confirm}
          title="연습을 중단하시겠어요?"
          message={`연습을 중단하시면\n이번 연습에 대한 피드백을 받을 수 없어요.`}
          okayText="중단하기"
          cancelText="계속 연습하기"
          onOkayClick={goToPresentationsPage}
        />
        <div className={styles.bubble}>
          <SpeechBubble
            context={bubble}
            message="녹음 버튼을 누르면 일시정지할 수 있어요."
            hasCloseBtn
          />
        </div>
        <NextSlideConfirm context={modal} handleOkay={handleConfirmOkay} />
      </form>
    )
  );
}
