"use client";
import { useEffect, useState } from "react";

import { getDetailArticle } from "@/blogAPI";
import { deleteArticle } from '../../../blogAPI';
import Image from "next/image";
import { DeleteButton } from "@/app/components/DeleteButton";
import { UpdateButton } from "@/app/components/UpdateButton";
import MarkdownRenderer from "@/app/components/MarkdownRenderer";
import Loading from "@/app/loading";
import { Article } from "@/types";


const Article = ({ params }: { params: { id: string } }) => {
  // 詳細ページのAPI呼び出し(json-serverから)
  // const detailArticle = await getDetailArticle(params.id);

  const [detailArticle, setDetailArticle] = useState<Article | null>(null);

  // 詳細ページのAPI呼び出し(supabaseから)
  useEffect(() => {
    const fetchArticle = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${API_URL}/api/blog/${params.id}`, {
        next: {
          revalidate: 10,
        },
      }); //ISR
      const data = await res.json();
      setDetailArticle(data);
    }
    fetchArticle();

  }, [params.id])


  if (!detailArticle) {
    return <Loading />
  }


  return (
    <div className="max-w-3xl mx-auto p-5">
      <Image
        src={`https://source.unsplash.com/collection/6541735/1000x500?sig=${detailArticle.id}`}
        alt="投稿画像"
        width={1280}
        height={300}
      />

      <h1 className="text-4xl text-center my-10">{detailArticle.title}</h1>
      <div className="text-lg leading-relaxed text-justify">
        <article>
          <MarkdownRenderer content={detailArticle.content} />
        </article>
        <p>Published {new Date(detailArticle.createdAt).toLocaleString()}</p>
      </div>

      <div className="flex justify-end mt-3 gap-4">
        <div>
          <UpdateButton id={detailArticle.id} />
        </div>
        <div>
          <DeleteButton id={detailArticle.id} />
        </div>
      </div>
    </div>
  );
};

export default Article;
