import Link from 'next/link';

export default function MainPage() {
  return (
    <div className="flex flex-col justify-center items-center max-w-full  *:text-center mx-5 transform translate-y-[135px]">
      <div className="flex flex-col gap-10 mb-5">
        <h1 className="text-4xl">Instagram</h1>
        <h2 className="text-2xl">
          친구들의 <strong className="text-red-500 font-normal">사진</strong>
          과&nbsp;
          <strong className="text-pink-600 font-normal">동영상</strong>을 보려면
          가입하세요.
        </h2>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <Link href="/app" className="btn">
          Instagram 앱 다운로드
        </Link>
        <div className="text-sm text-gray-700 mt-4">
          <span>
            <Link href="/login">로그인</Link>
            &nbsp;또는&nbsp;
            <Link href="/signup">회원가입</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
