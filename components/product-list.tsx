import Image from 'next/image';
import Link from 'next/link';

interface IProductProps {
  product: {
    title: string;
    photo: string;
    description: string;
    created_at: Date;
    id: number;
  };
}

export default function ProductList({ product }: IProductProps) {
  return (
    <div className="flex flex-col border-2 border-neutral-400 rounded-md overflow-hidden">
      <Link href={`home/${product.id}`} className="flex flex-col items-center">
        <div className="relative w-full h-40">
          <Image
            src={`${product.photo}/avatar`}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-2">
          <span className="text-sm font-semibold text-black text-center">
            {product.title}
          </span>
        </div>
      </Link>
    </div>
  );
}
