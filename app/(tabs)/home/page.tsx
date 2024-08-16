import ProductList from '@/components/product-list';
import db from '@/lib/db';
import Image from 'next/image';

async function getProduct() {
  const products = await db.product.findMany({
    select: {
      title: true,
      photo: true,
      description: true,
      created_at: true,
      id: true,
      user: true,
      userId: true,
    },
  });
  return products;
}

export default async function Home() {
  const products = await getProduct();
  return (
    <div className="grid grid-cols-2 gap-4 p-4 mb-14">
      {products.map((product) => (
        <ProductList key={product.id} product={product} />
      ))}
    </div>
  );
}
