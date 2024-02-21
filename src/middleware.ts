import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts|images).*)'],
};

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (
    !refreshToken &&
    (currentPath.startsWith('/home') ||
      currentPath.startsWith('/upload') ||
      currentPath.startsWith('/setting'))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (refreshToken && currentPath.startsWith('/login')) {
    const url = request.nextUrl.clone();
    url.pathname = '/home';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

function getTokenFromCookies(request: NextRequest) {
  const cookiesHeader = request.headers.get('cookie');
  if (!cookiesHeader) return null;

  const cookiesArray: [string, string][] = cookiesHeader.split('; ').map((cookie) => {
    const [key, value] = cookie.split('=');
    return [key, value];
  });

  const cookies = new Map(cookiesArray);
  return cookies;
}
