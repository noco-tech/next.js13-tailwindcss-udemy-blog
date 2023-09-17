import Image from 'next/image'
import React from 'react'


const Article = ({params}: {params: {id: string }}) => {

  return (
    <div className="max-w-3xl mx-auto p-5">
      <Image
        src={`https://source.unsplash.com/collection/1345862/1000x500?sig=${params.id}`}
        alt="投稿画像"
        width={1280}
        height={300}
      />
      <h1 className='text-4xl text-center my-10'>TITLE</h1>
      <div className='text-lg leading-relaxed text-justify'>
        <p>content</p>
        <p>Published 2021-01-01</p>
      </div>
    </div>
  );
}

export default Article
