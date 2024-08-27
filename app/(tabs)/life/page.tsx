import db from '@/lib/db';
import { formatToTimeAgo } from '@/lib/utils';
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getPosts() {
  const post = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      created_at: true,
      views: true,
      _count: {
        select: {
          like: true,
          comment: true,
        },
      },
    },
  });
  return post;
}

export default async function Life() {
  const posts = await getPosts();
  if (!posts) {
    return notFound();
  }
  return (
    <>
      <div className="p-5 ">
        {posts.map((post) => (
          <Link
            key={post.views}
            href={`/posts/${post.id}`}
            className=" flex flex-col gap-2 border-b-2 py-5 border-neutral-400 last:border-b-0 *:text-black"
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">{post.title}</h1>
              <p className="text-sm">{post.description}</p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <span>{formatToTimeAgo(post.created_at.toString())}</span>
                <span>・</span>
                <span>조회 {post.views}</span>
              </div>
              <div className="flex flex-row gap-3">
                <div className="flex flex-row gap-2 items-center">
                  <HandThumbUpIcon className="size-5" />
                  <span>{post._count.like}</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <ChatBubbleBottomCenterIcon className="size-5" />
                  <span>{post._count.comment}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
