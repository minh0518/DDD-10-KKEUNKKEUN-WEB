export const SOCIAL_ACCESS_URL = {
  KAKAO: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_ROUTE_HANDLER}/accounts/login/process`,
  NAVER: '',
  GOOGLE: '',
};
