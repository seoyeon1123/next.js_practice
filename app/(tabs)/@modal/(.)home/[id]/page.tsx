import db from '@/lib/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getProductDetail(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return product;
}

export async function ModalPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const product = await getProductDetail(id);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <div>
        <div className="w-full">
          <Image fill src={`${product.photo}/public`} alt={product.title} />
        </div>
      </div>
    </>
  );
}
