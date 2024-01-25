import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({ path, page, pageCount }) {
  return (
    <div className="flex items-center gap-2">
      <PaginationLink href={`${path}/?page=${page - 1}`} disabled={page < 2}>
        <ChevronLeftIcon className="w-6 h-6" />
				<span className="sr-only">Previous page</span>
      </PaginationLink>
      <p>
        Page: {page} of {pageCount}
      </p>
      <PaginationLink href={`/reviews/?page=${page + 1}`} disabled={pageCount === page} >
        <ChevronRightIcon className="w-6 h-6" />
				<span className="sr-only">Next page</span>
      </PaginationLink>
    </div>
  );
}

function PaginationLink({ children, href, disabled }) {
  return disabled ? (
    <span
      href={href}
      className="rounded border px-2 py-1 cursor-not-allowed text-slate-300"
    >
      {children}
    </span>
  ) : (
    <Link
      href={href}
      className="rounded border px-2 py-1 text-blue-500 hover:text-slate-700 hover:bg-orange-100"
    >
      {children}
    </Link>
  );
}
