'use client';

import { useRouter } from 'next/navigation'; // 클라이언트 측 리디렉션을 위한 훅
import {
  HeartIcon,
  MagnifyingGlassCircleIcon,
} from '@heroicons/react/24/outline';

export default function TopBar() {
  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 가져옵니다.

  const onClick = () => {
    router.push('/home'); // 클라이언트 측에서 리디렉션을 수행합니다.
  };

  return (
    <div className="flex flex-row justify-between items-center mx-3 mt-3">
      <h1 onClick={onClick} className="font-semibold text-3xl cursor-pointer">
        Instagram
      </h1>
      <div className="flex flex-row justify-center items-center gap-3">
        <HeartIcon className="text-black h-6 w-6 cursor-pointer hover:text-pink-600" />
        <MagnifyingGlassCircleIcon className="text-black h-6 w-6 cursor-pointer hover:text-gray-600" />
      </div>
    </div>
  );
}
