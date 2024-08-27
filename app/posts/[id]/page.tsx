import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToTimeAgo } from '@/lib/utils';
import { EyeIcon } from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';
import {
  revalidatePath,
  unstable_cache as nextCache,
  revalidateTag,
} from 'next/cache';
import { dislikePost, likePost } from './actions';
import LikeButton from '@/components/like-button';

async function getLike(postId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        userId: userId,
        postId: postId,
      },
    },
  });

  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });

  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

function getCachedLikeStatus(postId: number, userId: number) {
  const cachedOperate = nextCache(getLike, [`post-like-${postId}`], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperate(postId, userId);
}

async function getPost(id: number) {
  const post = await db.post.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return post;
}

const getCachedPost = nextCache(getPost, ['post-detail'], {
  tags: ['post-detail'],
});

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }

  const session = await getSession();
  const userId = session.id;
  const { likeCount, isLiked } = await getCachedLikeStatus(id, userId!);

  return (
    <div className="mt-10 p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gray-200 text-gray-800 font-semibold px-3 py-1 rounded-full">
          {post.user.username}
        </div>
        <span className="text-gray-500">•</span>
        <span className="text-gray-500 text-sm">
          {formatToTimeAgo(post.created_at.toString())}
        </span>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
        <p className="text-gray-700 mt-2 text-lg">{post.description}</p>
      </div>

      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center gap-2">
          <EyeIcon className="w-5 h-5" />
          <span className="text-sm">조회 {post.views}</span>
        </div>
        <div className="flex items-center gap-2">
          <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
        </div>
      </div>
    </div>
  );
}
