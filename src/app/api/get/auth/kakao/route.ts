import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const codeQuery = request.nextUrl.searchParams.get('code') as string;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/api/accounts/login/process?code=${codeQuery}&provider=kakao`;

  const response = await fetch(`${url}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const tokens = response.headers.get('set-cookie');

  if (tokens) {
    const newResponse = new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });
    newResponse.headers.set('Set-Cookie', tokens);
    return newResponse;
  }

  return new NextResponse('something wrong with token', { status: 500 });
}
