import Link from "next/link";
import Image from "next/image";

import { ArticleList } from "./components/ArticleList";
import { Article } from "@/types";
import penguinImage from "/images/penguin.png"
import kamatamaImage from "/images/kamatama.jpg"


export default async function Home() {
  // 全記事をjson-serverから取得するAPIを呼ぶ
  // const articles = await getAllArticles();
  // console.log(articles);
  // console.log(supabase)

  /* スパベースから全記事データを取得するAPIを呼ぶ */
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/api/blog`, { cache: "no-store" }); //SSR

  const articles: Article[] = await res.json();
  // console.log(articles);

  /* 各カテゴリーの記事数を取得するAPIを呼ぶ */
  const catRes = await fetch(`${API_URL}/api/blog/category`, {
    cache: "no-store",
  }); //SSR

  const categories = await catRes.json();
  // console.log(categories);

  /* 各カテゴリーの記事数の変数を定義
  カテゴリーが増えた場合ここに追記 */
  let tecLen = categories.find((item: { category: string; }) => item.category === 'Technology').count;
  let autLen = categories.find((item: { category: string; }) => item.category === 'Automotive').count;
  let finLen = categories.find((item: { category: string; }) => item.category === 'Finance').count;
  let spoLen = categories.find((item: { category: string; }) => item.category === 'Sports').count

  // const categoryNameLength = (categoryNameFilter: string) => {
  //   const filteredData = categories?.filter((item: { categories: string[] }) =>
  //     item.categories.includes(categoryNameFilter)
  //     );


  //   if (!filteredData) return;

  //   switch (categoryNameFilter) {
  //     case "Technology":
  //        tecLen += filteredData?.length ?? 0;
  //       break;
  //     case "Automotive":
  //       autLen += filteredData?.length ?? 0;
  //       break;
  //     case "Finance":
  //       finLen += filteredData?.length ?? 0;
  //       break;
  //     case "Sports":
  //       spoLen += filteredData?.length ?? 0;
  //       break;
  //   }
  //   // console.log(filteredData.length);
  // };
  // categoryNameLength("Technology");
  // categoryNameLength("Automotive");
  // categoryNameLength("Finance");
  // categoryNameLength("Sports");



  return (
    <div className="md:flex flex-grow">
      <section className="w-full md-2/3 flex-col items-center px-3">
        <ArticleList articles={articles} />
      </section>

      <aside className="w-full md:w-1/3 flex flex-col items-center px-3 md:pl-6">
        <div className="sticky top-0">
          <div className="bg-customGray shadow-md rounded p-4 mb-6 mt-4">
            <h3 className="font-bold text-gray-900 mb-2">About Me</h3>
            <div className="flex justify-center items-center">
              <Image
                src={kamatamaImage}
                alt="ロゴ画像"
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <p className="text-gray-600">
              熱心なプロフェッショナルで、チームワークを重視。常に学び続ける姿勢を持ち、新しい挑戦を楽しむ。結果を重視し、効率的な解決策を模索。
            </p>
            <div className="flex items-center justify-around">
              <Image
                src={`https://source.unsplash.com/collection/6541735/1000x500?sig=2`}
                alt="ロゴ画像"
                width={70}
                height={70}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="bg-secondary shadow-md rounded p-4 mb-6 mt-4 w-full">
            <h3 className="font-bold text-customGray mb-2">
              All Posts ({articles.length})
            </h3>
            <ul className="text-customGray mt-2 ">
              <li className="hover:text-slate-300 transition-all duration-100">
                <Link href="/category?name=Technology">
                  Technology ({tecLen})
                </Link>
              </li>
              <li className="hover:text-slate-300 transition-all duration-100">
                <Link href="/category?name=Automotive">
                  Automotive ({autLen})
                </Link>
              </li>
              <li className="hover:text-slate-300 transition-all duration-100">
                <Link href="/category?name=Finance">Finance ({finLen})</Link>
              </li>
              <li className="hover:text-slate-300 transition-all duration-100">
                <Link href="/category?name=Sports">Sports ({spoLen})</Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
