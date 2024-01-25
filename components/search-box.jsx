"use client";

import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Combobox } from "@headlessui/react";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 400);
  const [reviews, setReviews] = useState([]);
  const router = useRouter();

  const handleChange = (review) => {
    // console.log("selected: ", review);
    router.push(`/reviews/${review.slug}`);
  };

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        const url = "/api/search-review?query=" + encodeURIComponent(debouncedQuery);
        const response = await fetch(url, { signal: controller.signal });
        const list = await response.json();
        // console.log("list: ", list);
        setReviews(list);
      })();

      return () => controller.abort();
    } else {
      setReviews([]);
    }
  }, [debouncedQuery]);

  const filtered = reviews.filter((review) =>
    review.title.toUpperCase().includes(query.toUpperCase())
  );

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          value={query}
          autoComplete="off"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded py-1 px-2 w-full"
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {filtered.map((review) => (
            <Combobox.Option
              value={review}
              key={review.slug}
              className={({ active }) =>
                `relative cursor-default select-none py-2 px-2 ${
                  active ? "bg-teal-600 text-white" : "text-gray-900"
                }`
              }
            >
              {({ active }) => (
                <span className="px-2 block truncate w-full">
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
