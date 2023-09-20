import React from 'react'
import { getDetailArticle } from '@/blogAPI';
import Image from 'next/image'
import { DeleteButton } from '@/app/components/DeleteButton';


const Article = async ({params}: {params: {id: string }}) => {
  // 詳細ページのAPI呼び出し(json-serverから)
  // const detailArticle = await getDetailArticle(params.id);

  // 詳細ページのAPI呼び出し(supabaseから)
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/api/${params.id}`, {
    next: {
      revalidate: 10,
    }
  }); //ISR

  const detailArticle = await res.json();



  return (
    <div className="max-w-3xl mx-auto p-5">
      <Image
        src={`https://source.unsplash.com/collection/1345862/1000x500?sig=${detailArticle.id}`}
        alt="投稿画像"
        width={1280}
        height={300}
      />

      <h1 className="text-4xl text-center my-10">{detailArticle.title}</h1>
      <div className="text-lg leading-relaxed text-justify">
        <p>{detailArticle.content}</p>
        <p>Published {new Date(detailArticle.createdAt).toLocaleString()}</p>
      </div>
      <div className="text-right mt-3">
        <DeleteButton id={detailArticle.id} />
      </div>
    </div>
  );
}

export default Article
