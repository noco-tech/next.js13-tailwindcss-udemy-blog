import { getDetailArticle } from '@/blogAPI';
import Image from 'next/image'
import React from 'react'


const Article = async ({params}: {params: {id: string }}) => {
  // 詳細ページのAPI呼び出し
  const detailArticle = await getDetailArticle(params.id);

  return (
        <div className="max-w-3xl mx-auto p-5">
          <Image
            src={`https://source.unsplash.com/collection/1345862/1000x500?sig=${detailArticle.id}`}
            alt="投稿画像"
            width={1280}
            height={300}
          />

      <h1 className="text-4xl text-center my-10">{detailArticle.title }</h1>
          <div className="text-lg leading-relaxed text-justify">
        <p>{detailArticle.content }</p>
        <p>Published {detailArticle.createdAt }</p>
          </div>
        </div>
  );
}

export default Article
