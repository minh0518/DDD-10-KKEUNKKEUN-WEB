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
    REQUIRED: `입력한 날짜를 확인해 주세요.`,
  },
} as const;

export const ERROR_MESSAGE = {
  AUTH: {
    EXIST: '이미 로그인 된 상태입니다.',
    ERROR: '로그인 과정에서 문제가 발생했습니다',
    EXPIRE: '다시 로그인 해주세요',
  },
  USER: {
    ERROR: '유저 정보를 가져오는데 문제가 발생했습니다',
  },
  SERVICE: {
    ERROR: '문제가 발생했습니다',
    RETRY: '재시도 중 문제가 발생했습니다',
  },
} as const;
