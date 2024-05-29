'use client'; // Error components must be Client Components

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Spinner from '../_components/_modules/Spinner';

// 서버 컴포넌트 토큰 재발급 이슈 전용 에러 컴포넌트
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const fullUrl = `${currentPath}?${searchParams.toString()}`;

  useEffect(() => {
    const reIssue = async () => {
      const clientUrl = `/api/accounts/reissue`;
      await fetch(clientUrl, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
      });

      // 미들웨어 기반 리다이렉션
      window.location.href = fullUrl;
    };
    // if (error.message === 'reIssue') reIssue();
    reIssue();
  }, [error]);

  return (
    <>
      {/* {error.message === 'reIssue' ? (
        <Spinner />
      ) : (
        <div>
          <h2>Something went wrong!</h2>
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
        </div>
      )} */}
      <Spinner />
    </>
  );
}
