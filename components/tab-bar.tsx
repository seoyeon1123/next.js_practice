'use client';

import Link from 'next/link';
import {
  NewspaperIcon as OutlineNewspaperIcon,
  HomeIcon as OutlineHomeIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineLiveIcon,
  UserIcon as OutlineUserIcon,
} from '@heroicons/react/24/outline';
import {
  NewspaperIcon as SolidNewspaperIcon,
  HomeIcon as SolidHomeIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidLiveIcon,
  UserIcon as SolidUserIcon,
} from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';

export default function TabBar() {
  const pathname = usePathname();
  return (
    <>
      <div className="max-w-screen-sm fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-400 border-t-2 px-5 py-3 *:text-black bg-white">
        <Link href="/home " className="flex flex-col items-center gap-px">
          {pathname === '/home' ? (
            <SolidHomeIcon className="size-7" />
          ) : (
            <OutlineHomeIcon className="size-7" />
          )}
        </Link>
        <Link href="/chat" className="flex flex-col items-center gap-px">
          {pathname === '/chat' ? (
            <SolidChatIcon className="size-7" />
          ) : (
            <OutlineChatIcon className="size-7" />
          )}
        </Link>
        <Link href="/live" className="flex flex-col items-center gap-px">
          {pathname === '/live' ? (
            <SolidLiveIcon className="size-7" />
          ) : (
            <OutlineLiveIcon className="size-7" />
          )}
        </Link>
        <Link href="/life" className="flex flex-col items-center gap-px">
          {pathname === '/life' ? (
            <SolidNewspaperIcon className="size-7" />
          ) : (
            <OutlineNewspaperIcon className="size-7" />
          )}
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-px">
          {pathname === '/profile' ? (
            <SolidUserIcon className="size-7" />
          ) : (
            <OutlineUserIcon className="size-7" />
          )}
        </Link>
      </div>
    </>
  );
}
