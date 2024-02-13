export const MAX_LENGTH = {
  MEMO: 500,
  SCRIPT: 5000,
  TITLE: 20,
} as const;

export const VALIDATION_MESSAGE = {
  MEMO: {
    MAX_LENGTH: `${MAX_LENGTH.MEMO}자 이내로 작성해 주세요.`,
  },

  SCRIPT: {
    MAX_LENGTH: `${MAX_LENGTH.SCRIPT}자 이내로 작성해 주세요.`,
    REQUIRED: `대본은 필수 입력 입니다.`,
  },

  TITLE: {
    MAX_LENGTH: `${MAX_LENGTH.TITLE}자 이내로 작성해 주세요`,
    REQUIRED: `발표 이름은 필수 입력 입니다.`,
  },

  DDAY: {
    REQUIRED: `날짜는 필수 입력입니다.`,
  },
} as const;
