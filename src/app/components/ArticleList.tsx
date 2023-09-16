import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const ArticleList = () => {
  return (
    <div>
      <article className="shadow my-4 flex flex-col">
        <Link href="#" className="hover:opacity-90">
          <Image
            src="https://source.unsplash.com/collection/1345863/1000x500?sig=1"
            alt=""
            width={1280}
            height={300}
          />
        </Link>
        <div className="bg-white flex flex-col justify-start p-6">
          <Link href="#" className="text-blue-700 pb-4 font-bold">
            Technology
          </Link>
          <Link
            href="#"
            className="text-slate-900 text-3xl font-bold hover:text-gray-700 pb-4"
          >
            Next勉強中
          </Link>
          <p className="text-sm pb-3 text-slate-900">Published 2023/9/16</p>
          <Link href="#" className="text-slate-900 pb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia est
            magnam expedita cum aliquam nulla voluptas alias repellendus iure
            illum, qui sunt. Consectetur, porro quasi. Error incidunt quae
            libero consequatur.
          </Link>
          <Link href="#" className="text-pink-800 hover:text-black">
            つづきを読む
          </Link>
        </div>
      </article>
      <article className="shadow my-4 flex flex-col">
        <Link href="#" className="hover:opacity-90">
          <Image
            src="https://source.unsplash.com/collection/1345865/1000x500?sig=1"
            alt=""
            width={1280}
            height={300}
          />
        </Link>
        <div className="bg-white flex flex-col justify-start p-6">
          <Link href="#" className="text-blue-700 pb-4 font-bold">
            Technology
          </Link>
          <Link
            href="#"
            className="text-slate-900 text-3xl font-bold hover:text-gray-700 pb-4"
          >
            Next勉強中
          </Link>
          <p className="text-sm pb-3 text-slate-900">Published 2023/9/16</p>
          <Link href="#" className="text-slate-900 pb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia est
            magnam expedita cum aliquam nulla voluptas alias repellendus iure
            illum, qui sunt. Consectetur, porro quasi. Error incidunt quae
            libero consequatur.
          </Link>
          <Link href="#" className="text-pink-800 hover:text-black">
            つづきを読む
          </Link>
        </div>
      </article>
      <article className="shadow my-4 flex flex-col">
        <Link href="#" className="hover:opacity-90">
          <Image
            src="https://source.unsplash.com/collection/1345862/1000x500?sig=1"
            alt=""
            width={1280}
            height={300}
          />
        </Link>
        <div className="bg-white flex flex-col justify-start p-6">
          <Link href="#" className="text-blue-700 pb-4 font-bold">
            Technology
          </Link>
          <Link
            href="#"
            className="text-slate-900 text-3xl font-bold hover:text-gray-700 pb-4"
          >
            Next勉強中
          </Link>
          <p className="text-sm pb-3 text-slate-900">Published 2023/9/16</p>
          <Link href="#" className="text-slate-900 pb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia est
            magnam expedita cum aliquam nulla voluptas alias repellendus iure
            illum, qui sunt. Consectetur, porro quasi. Error incidunt quae
            libero consequatur.
          </Link>
          <Link href="#" className="text-pink-800 hover:text-black">
            つづきを読む
          </Link>
        </div>
      </article>
    </div>
  );
}

