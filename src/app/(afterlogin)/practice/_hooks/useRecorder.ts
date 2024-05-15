import { useEffect, useRef, useState } from 'react';

interface ReturnType {
  /** 마이크 권한 여부 */
  isPermitted: boolean;
  /** 녹음 진행 여부 */
  isRecording: boolean;
  /** 녹음 정보 객체 */
  audioBlob: Blob | null;
  /** 마이크 권한 변경 이벤트 */
  processPermission: () => void;
  /** 미디어 스트림 가져오는 함수 */
  getMedia: () => void;
  /** 녹음 시작 함수 */
  startRecording: () => void;
  /** 녹음 일시정지 함수 */
  pauseRecording: () => void;
  /** 녹음 재개 함수 */
  resumeRecording: () => void;
  /** 녹음 종료 함수 */
  stopRecording: () => void;
  /** 녹음 파일 반환 함수 */
  getAudioFile: () => Promise<unknown>;
}

const useRecorder = (): ReturnType => {
  const [isPermitted, setIsPermitted] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks: Blob[] = [];

  //

  /** 마이크 권한 변경 감지 이벤트
   *
   * TODO: 좀 더 알아볼 것
   * - 마이크 권한 허용 X > 허용 O으로 변경 > 허용 X로 변경
   * - 이런 경우, 마지막에 허용을 묻는 안내창이 브라우저에 다시 등장하지 않음. 해결 방법이 있는지 확인 필요
   */
  const processPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });

      checkPermission(result.state);

      result.onchange = () => {
        checkPermission(result.state);
        getMedia();
      };
    } catch (error) {
      console.error(error);
    }
  };

  /** 마이크 권한 체크 함수 */
  const checkPermission = (state: PermissionState) => {
    switch (state) {
      case 'granted':
        setIsPermitted(true);
        break;
      case 'denied':
        setIsPermitted(false);
        break;
      default:
        setIsPermitted(false);
    }
  };

  /** 미디어 스트림 가져오는 함수 */
  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      setStream(stream);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  /** 녹음 시작하는 함수 */
  const startRecording = () => {
    console.log('start ~');
    if (!stream) return;

    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
      console.log('on stop!...', audioBlob);
      setAudioBlob(audioBlob);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();

    setIsRecording(true);
  };

  /** 녹음 일시정지 함수 */
  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      console.log('pause ...');
      mediaRecorderRef.current.pause();
      setIsRecording(false);
    }
  };

  /** 녹음 재개 함수 */
  const resumeRecording = () => {
    if (mediaRecorderRef.current && !isRecording) {
      console.log('resume ...!');
      mediaRecorderRef.current.resume();
      setIsRecording(true);
    }
  };

  /** 녹음 멈추는 함수 */
  const stopRecording = async () => {
    console.log('stop!');
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  /** 녹음 파일 반환 함수 */
  const getAudioFile = async () => {
    return new Promise((resolve, reject) => {
      if (!mediaRecorderRef.current) return reject('media recorder is not');

      // onstop 이벤트 핸들러 등록
      mediaRecorderRef.current.onstop = () => {
        resolve(audioBlob); // Promise 해결
      };

      // onerror 이벤트 핸들러 등록 (필요에 따라)
      mediaRecorderRef.current.onerror = (event) => {
        reject(`event error !`); // Promise 거부
      };
    });
  };

  return {
    isPermitted,
    isRecording,
    audioBlob,
    processPermission,
    getMedia,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    getAudioFile,
  };
};

export default useRecorder;
