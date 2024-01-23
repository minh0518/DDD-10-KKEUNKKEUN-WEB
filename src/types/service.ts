export interface PagesDataType {
  title: string | null;
  dDay: {
    date: any;
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
