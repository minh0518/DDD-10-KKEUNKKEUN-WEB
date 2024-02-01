type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface ValidtaionType {
  title: string;
  script: string;
  dDayDate: Value;
}

export interface PagesDataType {
  title: string | null;
  dDay: {
    date: Value;
    repeat: any;
    includeToday: any;
  };
  time: {
    timer: any;
    alramTime: any;
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
