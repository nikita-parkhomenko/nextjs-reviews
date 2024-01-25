'use client';

import { useState } from "react";
import { LinkIcon } from '@heroicons/react/20/solid';

export default function ShareLinkButton() {
  const [copied, setCopied] = useState(false);
  console.log('ShareLinkButton render');

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => { setCopied(false) }, 3000);
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 rounded border px-2 py-1 text-slate-500 hover:text-slate-700 hover:bg-orange-100"
    >
      <LinkIcon className="w-4 h-4" />
      {copied ? 'Copied!' : 'Share link!'}
    </button>
  )
}
