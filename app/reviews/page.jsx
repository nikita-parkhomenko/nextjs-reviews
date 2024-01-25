import Link from "next/link";
import Image from "next/image";

import { getReviews } from "@/lib/reviews";
import Heading from "@/components/heading";
import SearchBox from "@/components/search-box";
import Pagination from "@/components/pagination";

export const metadata = {
  title: 'Reviews',
}

// export const dynamic = 'force-dynamic';

function parsePageParam(paramValue) {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }

  return 1;
}

const PAGE_SIZE = 6;

export default async function ReviewsPage({ searchParams }) {
  // console.log('[ReviewsPage]: ', reviews.map(({slug}) => slug).join(', '));
  const page = parsePageParam(searchParams.page);
  const { reviews, meta } = await getReviews({ pageSize: PAGE_SIZE, page });
  const pageCount = meta.pagination?.pageCount;

  return (
      <div>
        <Heading>Reviews</Heading>
        <div className="flex justify-between mb-6">
          <Pagination path="/reviews" page={page} pageCount={pageCount} />
          <SearchBox />
        </div>
        <nav>
          <ul className="flex flex-wrap gap-3">
            {reviews.map((review) => (
              <li
                key={review.slug}
                className="rounded  bg-white shadow hover:shadow-lg"
              >
              <Link href={`/reviews/${review.slug}`}>
                <Image
                  priority
                  width="320"
                  height="180"
                  alt="game banner"
                  src={review.imageSrc}
                  className="mb-2 rounded-t"
                />
                <p className="font-orbitron text-center mb-2">
                  {review.title}
                </p>
              </Link>
            </li>
            ))}
          </ul>
        </nav>
      </div>
    )
}
