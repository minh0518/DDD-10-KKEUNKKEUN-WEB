type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

// mock
export interface ValidtaionType {
  title: string;
  script: string;
  memo: string;
  dDayDate: Value;
}

export interface PagesDataType {
  title: string | null;
  dDay: {
    date: Value;
  };
  time: {
    timer: number | null;
    alramTime: number | null;
  };
  scripts: {
    ppt: { dataURL: string | null; file: File | null };
    script: string | null;
    memo: string | null;
  }[];
}

export interface PresentInfoType {
  id: number | null;
  data: PagesDataType;
}

// service

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
