import Image from "next/image";
import Markdown from "react-markdown";
import { notFound } from "next/navigation";

import Heading from "@/components/heading";
import { getReview, getSlugs } from "@/lib/reviews";
import ShareLinkButton from "@/components/share-link-button";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params: { slug } }) {
  const review = await getReview(slug);

  if (!review) {
    notFound();
  }

  return {
    title: review.title,
  }
}

export default async function ReviewPage({ params: { slug } }) {
  const review = await getReview(slug);
  console.log('[ReviewPage]', review.slug);

  if (!review) {
    notFound();
  }

  return (
    <div>
      <Heading>{review.title}</Heading>
      <div className="flex gap-3 items-baseline mb-3">
        <p className="italic mb-2 text-gray-600">
          <small>{review.createdDate}</small>
        </p>
        <ShareLinkButton />
      </div>
      <Image
        priority
        width="640"
        height="360"
        alt="game banner"
        src={review.imageSrc}
        className="mb-2 rounded"
      />
      <article className="prose">
        <Markdown>
          {review.content}
        </Markdown>
      </article>
    </div>
  )
}
