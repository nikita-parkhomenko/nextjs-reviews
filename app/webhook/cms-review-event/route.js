import { revalidateTag } from "next/cache";

import { CACHE_REVIEWS_TAG } from "@/lib/reviews";

export async function POST(request) {
  const payload = await request.json();
  if (payload.model === 'review') {
    revalidateTag(CACHE_REVIEWS_TAG);
    // console.log('payload: ')
    console.log('revalidated: ', CACHE_REVIEWS_TAG);
  }
  return new Response(null, { status: 204 });
}