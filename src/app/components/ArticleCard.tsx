import { Article } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {

  return (
    <article key={article.id} className="shadow my-4 flex flex-col">
      <Link href={`articles/${article.id}`} className="hover:opacity-90">
        <Image
          src={`https://source.unsplash.com/collection/6541735/1000x500?sig=${article.id}`}
          alt=""
          width={1280}
          height={300}
        />
      </Link>
      <div className="bg-white flex flex-col justify-start p-6">
        <Link
          href={`/category?name=${article.categories}`}
          className="text-blue-700 pb-4 font-bold"
        >
          {article.categories}
        </Link>
        <Link
          href={`articles/${article.id}`}
          className="text-slate-900 text-3xl font-bold hover:text-gray-700 pb-4"
        >
          {article.title}
        </Link>
        <p className="text-sm pb-3 text-slate-900">
          Published {new Date(article.createdAt).toLocaleString()}
        </p>
        <Link href={`articles/${article.id}`} className="text-slate-900 pb-6">
          {article.content.length > 70
            ? article.content.substring(0, 70) + "..."
            : article.content}
        </Link>
        <Link
          href={`articles/${article.id}`}
          className="text-pink-800 hover:text-black"
        >
          つづきを読む
        </Link>
      </div>
    </article>
  );
};
