import qs from 'qs';
import { writeFileSync } from "node:fs";

const url = 'http://localhost:1337/api/reviews?'
+ qs.stringify({
    fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
    filters: { slug: { $eq: 'fall-guys' } },
    populate: { image: { fields: ['url'] } },
    pagination: { pageSize: 1, withCount: false }
  })

const response = await fetch(url);
const reviews = await response.json();
const formatted = JSON.stringify(reviews, null, 2);
const file = 'scripts/strapi-response.json';
writeFileSync(file, formatted, 'utf-8');
