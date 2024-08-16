import db from '@/lib/db';
import { formatToTimeAgo } from '@/lib/utils';
import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// 비동기 함수로 데이터를 가져옵니다.
async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      photo: true,
      description: true,
      created_at: true,
      user: true,
    },
  });

  return product;
}

async function getLoading() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
}

// `params`에서 `id`를 받아와서 비동기로 데이터를 처리합니다.
export default async function HomeDetail({
  params,
}: {
  params: { id: string };
}) {
  // `id`를 숫자로 변환합니다.
  const id = Number(params.id);

  // `id`가 유효한 숫자인지 확인합니다.
  if (isNaN(id)) {
    return notFound();
  }

  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }

  const loading = await getLoading();

  // 데이터를 렌더링합니다.
  return (
    <div className="mb-16 p-3">
      <Image src={product.photo} alt={product.title} width={500} height={300} />
      <div className="flex flex-row justify-between py-2">
        <div className="flex flex-row gap-3">
          <HeartIcon className="size-7" />
          <ChatBubbleOvalLeftEllipsisIcon className="size-7" />
          <PaperAirplaneIcon className="size-7" />
        </div>
        <BookmarkIcon className="size-7" />
      </div>
      <div className="*:text-sm">
        <h3>{product.user.username}</h3>
        <p>{product.description}</p>
        <p className="text-neutral-300">
          {formatToTimeAgo(product.created_at.toString())}
        </p>
      </div>
    </div>
  );
}
