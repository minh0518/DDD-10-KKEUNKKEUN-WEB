export const clientUserApi = {
  // mock
  // TODO: 실제 백엔드 API로 변경 및 파일 위치 이동 예정
  getPresentData: async <T>(id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_HANDLER}/api/get/list/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('something went to wrong');
    }

    const result = await response.json();

    return result as T;
  },
};
