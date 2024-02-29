type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

// mock
export interface ValidtaionType {
  title: string;
  script: string;
  memo: string;
  deadlineDate: Value;
}

// Mock
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

// service
/** 유저 정보를 나타내는 객체 */
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
  /** 발표 날짜  */
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

/** ppt 주요 문장 설정 정보 - 발표 설정 후 최종적으로 PATCH */
export interface SlidesSettingType {
  /** SHOW: 모든 문장 보기 HIDE: 외울 문장 가리기 */
  practiceMode: 'SHOW' | 'HIDE';
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
  practiceMode: 'SHOW' | 'HIDE';
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
