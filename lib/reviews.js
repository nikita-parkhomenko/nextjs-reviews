import qs from "qs";

const CMS_URL = process.env.CMS_URL;
export const CACHE_REVIEWS_TAG = "reviews";

export async function getReview(slug) {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });

  if (!data.length) {
    return null;
  }

  const review = data[0];
  return {
    slug: review.attributes.slug,
    title: review.attributes.title,
    content: review.attributes.body,
    imageSrc: CMS_URL + review.attributes.image.data.attributes.url,
    createdDate: review.attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
  };
}

export async function getReviews({ pageSize, page }) {
  const { data, meta } = await fetchReviews({
    fields: ["slug", "title", "subtitle"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize, page },
  });

  const reviews = data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    imageSrc: CMS_URL + attributes.image.data.attributes.url,
  }));

  return { reviews, meta };
}

export async function getReviewsByTitle(title) {
  const { data } = await fetchReviews({
    filters: { title: { $containsi: title } },
    fields: ["slug", "title"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 5 },
  });

  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}

async function fetchReviews(params) {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(params, { encodeValuesOnly: true });
  const response = await fetch(url, {
    next: {
      tags: [CACHE_REVIEWS_TAG],
    },
  });
  if (!response.ok) {
    throw new Error(`Error trying to fetch data for ${url}`);
  }
  return await response.json();
}

export async function getSlugs() {
  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });

  return data.map((item) => item.attributes.slug);
}
