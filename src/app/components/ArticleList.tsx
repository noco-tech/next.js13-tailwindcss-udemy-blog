import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const ArticleList = () => {
  return (
    <div>
      <article>
        <Link href="#">
          <Image
            src="https://source.unsplash.com/collection/1345863/1000x500?sig=1"
            alt=""
            width={1280}
            height={300}
          />
        </Link>
        <div>
          <Link href="#">Technology</Link>
          <Link href="#">Next勉強中</Link>
          <p>By anonymous Published 2023/9/16</p>
          <Link href="#">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia est magnam expedita cum aliquam nulla voluptas alias repellendus iure illum, qui sunt. Consectetur, porro quasi. Error incidunt quae libero consequatur.
          </Link>
          <Link href="#">
            つづきを読む
          </Link>

        </div>
      </article>
    </div>
  );
}

