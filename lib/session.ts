import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface ISessionProps {
  id?: number;
}

export default function getSession() {
  return getIronSession<ISessionProps>(cookies(), {
    cookieName: 'delicious-Karrot',
    password: process.env.COOKIE_PASSWORD!,
  });
}
