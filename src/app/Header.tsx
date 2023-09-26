import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <header className="py-5 px-10 border-b border-b-secondary flex justify-between items-center">
      <div>
        <h1 className="text-2xl text-customGray font-extrabold">
          <Link href="/">Next.js Blog</Link>
        </h1>
      </div>
      <div>
        <nav className="text-sm font-medium">
          <Link
            href="/articles/new"
            className="bg-secondary px-3 py-3 rounded-md"
          >
            記事を書く
          </Link>
        </nav>
      </div>
    </header>
  );
}

