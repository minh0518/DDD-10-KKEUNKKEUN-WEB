type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];
export type PracticeMode = 'SHOW' | 'HIDE';

// # Mock

export interface ValidtaionType {
  title: string;
  script: string;
  memo: string;
  deadlineDate: Value;
  timeLimit_hour: number;
  timeLimit_minute: number;
  alertTime_hour: number;
  alertTime_minute: number;
}
export interface MockUploadDataType {
  id?: number;
  dday?: number;
  createdAt?: Date;
  modifiedAt?: Date;
  title: string | null;
  timeLimit: {
    hours: number | null;
    minutes: number | null;
  };
  alertTime: {
    hours: number | null;
    minutes: number | null;
  };
  deadlineDate: Value;
  slides: {
    id?: number;
    imageFileId: { dataURL: string | null; file: File | null }; // 변경 예정
    script: string | null;
    memo: string | null;
  }[];
}

//

// #region Account API
/** 유저 정보를 나타내는 객체
 * @property email - 소셜 이메일
 * @property nickName - 소셜 닉네임
 * @property socialProvider - 네이버, 카카오, 구글
 */
export interface UserInfoType {
  email: string;
  nickName: string;
  socialProvider: string;
}

/** 세션 id 조회 res */
export interface SessionId {
  sessionId: string;
}
// #endregion

// #region Presentation API
/** 발표 자료 업로드 객체 - 발표 상세 조회, 생성 및 수정
 *  기본타입 - 생성 및 수정에 사용되는 요소들
 *  옵셔널타입 - 발표 상세 조회시, 추가되는 요소들
 */
export interface UploadDataType {
  /** 발표 ID - URL에 라우팅 되는 값 */
  id?: number;
  /** 현재 날짜로부터 deadlineDate까지 남은 일수  */
  dday?: number;
  /** 최초 생성 시간  */
  createdAt?: Date;
  /** 마지막 수정 시간  */
  modifiedAt?: Date;
  /** 발표 제목  */
  title: string | null;
  /** 총 발표 시간  */
  timeLimit: {
    hours: number | null;
    minutes: number | null;
  };
  /** 중간 알림  */
  alertTime: {
    hours: number | null;
    minutes: number | null;
  };
  /** 발표 날짜 */
  deadlineDate: Value;
  /** ppt 슬라이드 리스트 */
  slides: {
    /** DB Identity Sequence. 백엔드 조회용 */
    id?: number;
    /** 이미지 파일 ID */
    imageFileId: number | null;
    /** 이미지 파일 URL */
    imageFilePath: string | null;
    /** 대본 */
    script: string | null;
    /** 메모 */
    memo: string | null;
  }[];
}

/** ppt 주요 문장 설정 정보 - 발표 설정 후 최종적으로 PATCH */
export interface SlidesSettingType {
  /** SHOW: 모든 문장 보기 HIDE: 외울 문장 가리기 */
  practiceMode: PracticeMode;
  /** ppt 슬라이드 리스트 */
  slides: {
    /** DB Identity Sequence. 백엔드 조회용 */
    id: number;
    /** 외울 문장 리스트  */
    memorizationSentences: {
      /** 외울 문장 시작 인덱스  */
      offset: number;
      /** 외울 문장 길이 (시작 지점 포함) */
      length: number;
    }[];
  }[];
}

/** ppt 전체 정보 (+주요 문장 포함) - 최초 설정 페이지 진입시 GET */
export interface SettingDataType {
  /** 발표 ID - URL에 라우팅 되는 값 */
  presentationId: number;
  /** 발표 제목 */
  title: string;
  /** 총 발표 시간  */
  timeLimit: {
    hours: number | null;
    minutes: number | null;
  };
  /** 중간 알림  */
  alertTime: {
    hours: number | null;
    minutes: number | null;
  };
  /** SHOW: 모든 문장 보기 HIDE: 외울 문장 가리기 (default: 'SHOW')*/
  practiceMode: PracticeMode;
  /** 다음 슬라이드 넘어가기 모달 표시 여부 (default: true)*/
  activateNextSlideModal: boolean;
  /** ppt 슬라이드 리스트 */
  slides: {
    /** DB Identity Sequence. 백엔드 조회용 */
    id: number;
    /** 이미지 파일 URL */
    imageFilePath: string;
    /** 대본 */
    script: string;
    /** 메모 */
    memo: string;
    /** 외울 문장 리스트  */
    memorizationSentences: {
      /** 외울 문장 시작 인덱스  */
      offset: number;
      /** 외울 문장 끝 인덱스 */
      end?: number;
      /** 외울 문장 길이 (시작 지점 포함) */
      length: number;
      /** 외울 문장 텍스트 */
      text?: string;
    }[];
  }[];
  /** 최초 생성 시간  */
  createdAt: Date;
  /** 마지막 수정 시간  */
  modifiedAt: Date;
}
// #endregion

// #region Practice API

/** 발표 연습 상세 조회 res */
export interface PracticeDetail {
  /** 발표 ID */
  presentationId: number;
  /** 발표 제목 */
  title: string;
  /** 타이머 정보 */
  timeLimit: PracticeTime;
  /** 종료 전 알림 정보 */
  alertTime: PracticeTime;
  /** 발표 모드 */
  practiceMode: PracticeMode;
  /** 다음 슬라이드 넘어가기 모달 표시 여부 */
  activateNextSlideModal: boolean;
  /** 슬라이드 리스트 */
  slides: PracticeSlide[];

  createdAt: string;
  modifiedAt: string;
}

/** 발표연습 상세 조회 - 시간 정보 */
export interface PracticeTime {
  hours: number;
  minutes: number;
}

/** 발표연습 상세 조회 - 슬라이드 정보 */
export interface PracticeSlide {
  /** 슬라이드 ID */
  id: number;
  /** 슬라이드 이미지 파일 ID */
  imageFilePath: string | null;
  /** 발표 스크립트 */
  script: string;
  /** 메모 */
  memo: string | null;
  /** 외울 문장 리스트 */
  memorizationSentences: Memorization[];
}

/** 발표연습 상세 조회 - 외울문장 정보 */
export interface Memorization {
  /** 외울 문장 시작점  */
  offset: number;
  /** 외울 문장 끝점 */
  end: number;
  /** 외울 문장 길이 */
  length: number;
  /** 외울 문장 텍스트 */
  text: string;
}

/** 발표 연습 완료된 슬라이드 저장 req */
export interface SavePracticeParams {
  memo: string | null;
  audioFileId: number | null;
}
// #endregion

// #region File API
/** 파일 업로드 res */
export interface UploadFile {
  id: number;
  path: string;
}
// #endregion

export interface PresentationListType {
  page: {
    content: {
      id: number;
      title: string;
      dday: number;
      timeLimit: {
        hours: number;
        minutes: number;
      };
      thumbnailPath: string;
      createdAt: Date;
      modifiedAt: Date;
    }[];
    totalPages: number;
    totalElements: number;
    empty: false;
  };
}
export interface LatestPresentationType {
  id: number;
  title: string;
  dday: number;
  timeLimit: {
    hours: number;
    minutes: number;
  };
  createdAt: Date;
  modifiedAt: Date;
}

export interface FeedbackListType {
  page: {
    content: {
      id: number;
      title: string;
      practiceDate: string;
      totalScore: number;
      status: 'IN_PROGRESS' | 'DONE' | 'FAIL';
      thumbnailPath: string; // 임시
      createdAt: Date; // 임시
      modifiedAt: Date; // 임시
    }[];
    totalPages: number;
    totalElements: number;
    empty: boolean;
  };
}
export interface FeedbackInfoType {
  id: number;
  title: string;
  practiceDate: string;
  practiceTimes: number;
  isFirstPractice: boolean;
  totalScore: number;
  variationFeedback: {
    beforeTotalScore: number;
    increasePercentage: number;
    description: string;
  };
  memorizationFeedback: {
    title: string;
    score: number;
    grade: string;
    description: string;
    subGrade: '미흡' | '완벽';
  };
  speedFeedback: {
    title: string;
    score: string;
    grade: string;
    description: string;
    subGrade: '미흡' | '완벽';
  };
  timeFeedback: {
    targetTime: {
      hours: number;
      minutes: number;
      seconds: number;
    };
    practicedTime: {
      hours: number;
      minutes: number;
      seconds: number;
    };
  };
  memorizationSentenceReivew: {
    slides: [
      {
        id: number;
        imageFilePath: string;
        script: string;
        hasWordError: boolean;
        wordErros: [
          {
            offset: number;
            length: number;
            end: number;
            text: string;
          },
          {
            offset: number;
            length: number;
            end: number;
            text: string;
          },
        ];
      },
      {
        id: number;
        imageFilePath: string;
        script: string;
        hasWordError: boolean;
        wordErros: string[];
      },
    ];
  };
}

export type CardListType =
  | PresentationListType['page']['content'][0]
  | FeedbackListType['page']['content'][0];
