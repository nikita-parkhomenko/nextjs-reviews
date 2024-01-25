import Link from "next/link";
import Image from "next/image";

import Heading from "@/components/heading";
import { getReviews } from "@/lib/reviews";

const PAGE_SIZE = 3;

export default async function HomePage() {
  // console.log('[HomePage]: ', reviews.map(({slug}) => slug).join(', '));
  const { reviews } = await getReviews({ pageSize: PAGE_SIZE, page: 1 });

  return (
    <div>
      <Heading>Here is our best catalog</Heading>
      <p className="mb-3">Please enjoy our best games catalog</p>
      <ul className="flex flex-col gap-3">
        {reviews.map((review, index) => (
          <li key={review.slug} className="rounded w-64 bg-white sm:w-full shadow hover:shadow-lg">
          <Link href={`/reviews/${review.slug}`} className="flex gap-3 flex-col sm:flex-row">
            <Image
              priority
              width="320"
              height="180"
              quality={100}
              alt="game banner"
              src={review.imageSrc}
              className="rounded-t"
            />
            <div className="flex flex-col">
              <p className="font-orbitron mb-2 text-center sm:text-left">
                {review.title}
              </p>
              <p className="hidden sm:block text-slate-500">
                {review.subtitle}
              </p>
            </div>
          </Link>
        </li>
        ))}
      </ul>
    </div>
  )
}
