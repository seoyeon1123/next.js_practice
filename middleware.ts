import { NextRequest } from 'next/server';
import getSession from './lib/session';
import { redirect } from 'next/navigation';

interface IRoutesProps {
  [key: string]: boolean;
}

const publicOnlyUrl: IRoutesProps = {
  '/': true,
  '/sms': true,
  '/login': true,
  '/signup': true,
};

export async function middleware(requset: NextRequest) {
  const session = await getSession();
  const exits = publicOnlyUrl[requset.nextUrl.pathname];

  if (!session.id) {
    if (!exits) {
      return Response.redirect(new URL('/', requset.url));
    }
  } else {
    if (exits) {
      return Response.redirect(new URL('/profile', requset.url));
    }
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
