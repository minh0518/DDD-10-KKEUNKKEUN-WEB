import { NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware() {
  const session = await auth();
  if (!session) return NextResponse.redirect('#'); // 로그인 페이지
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [],
};
