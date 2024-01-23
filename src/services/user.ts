export const userApi = {
  // mock
  getPresentData: async <T>(id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get/list/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('something went to wrong');
    }

    const result = await response.json();

    return result as T;
  },
};
