import { NextResponse } from "next/server";

import { getReviewsByTitle } from "@/lib/reviews";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get('query');
  // console.log('/api/search-review: ', query);
  const reviews = await getReviewsByTitle(query);
  return NextResponse.json(reviews);
}
