"use client";
import Link from "next/link";

export const Header = () => {
  const user = true;
  const userAlert = () => {
    alert("管理者のみ投稿できます");
  };

  return (
    <header className="py-5 px-10 border-b border-b-secondary flex justify-between items-center">
      <div>
        <h1 className={`text-2xl font-extrabold`}>
          <Link href="/">Next.js Blog</Link>
        </h1>
      </div>
      <div>
        <nav className="text-sm font-medium">
          <Link
            href={`${user ? "/articles/new" : "/"}`}
            onClick={userAlert}
            className="bg-secondary text-customGray px-3 py-3 rounded-md"
          >
            記事を書く
          </Link>
        </nav>
      </div>

    </header>
  );
};
