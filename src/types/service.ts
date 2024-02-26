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
  /** ppt 페이지별 정보  */
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
