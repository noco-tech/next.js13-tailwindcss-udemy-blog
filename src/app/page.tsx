import Link from "next/link";
import Image from "next/image";

import { ArticleList } from "./components/ArticleList";
import { Article } from "@/types";
import kamaTamaImage from "/public/images/kamaTama.jpg";
import ThemeButton from "@/app/components/ThemeButton";

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

  /* 各カテゴリーの記事数の取得
  カテゴリーが増えた場合、こことsupabaseのSQLに追記 */
  const getCountFromCategory = (categoryName: string) => {
    const item = categories.find(
      (item: { category: string }) => item.category === categoryName
    );
    return item ? item.count : 0;
  }

  let tecLen = getCountFromCategory("Technology");
  let autLen = getCountFromCategory("Automotive");
  let finLen = getCountFromCategory("Finance");
  let spoLen = getCountFromCategory("Sports");



  // SQLのcountを使わない場合のコード
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
                src={kamaTamaImage}
                alt="ロゴ画像"
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <p className="text-gray-600">
              プロフェッショナルな中にも熱い心を隠している冒険者。新しい知識は私のデザートのようなごちそう。未知の挑戦にワクワクし、結果を出しつつ、スマートな解を探求します。
            </p>
            <div className="flex items-center justify-around">
              <ThemeButton />
            </div>
          </div>
          <div className="bg-secondary shadow-md rounded p-4 mb-6 mt-4 w-full">
            <h3 className="font-bold text-customGray mb-2">
              All Posts ({articles.length})
            </h3>
            <ul className="text-customGray mt-2 ">
              <li className="hover:scale-105 transition-all duration-100">
                <Link href="/category?name=Technology">
                  Technology ({tecLen})
                </Link>
              </li>
              <li className="hover:scale-105 transition-all duration-100">
                <Link href="/category?name=Automotive">
                  Automotive ({autLen})
                </Link>
              </li>
              <li className="hover:scale-105 transition-all duration-100">
                <Link href="/category?name=Finance">Finance ({finLen})</Link>
              </li>
              <li className="hover:scale-105 transition-all duration-100">
                <Link href="/category?name=Sports">Sports ({spoLen})</Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
