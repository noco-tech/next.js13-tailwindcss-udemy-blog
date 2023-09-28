"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { Article } from "@/types";

import { ArticleList } from "@/app/components/ArticleList";
import { PostgrestResponse } from "@supabase/supabase-js";
// import { useRouter } from "next/router";

const CategoryBlogPage = () => {
  const [posts, setPosts] = useState<Article[]>([]);
  const [tecLen, setTecLen] = useState<number>(0);
  const [autLen, setAutLen] = useState<number>(0);
  const [finLen, setFinLen] = useState<number>(0);
  const [spoLen, setSpoLen] = useState<number>(0);

  // const [name, setName] = useState<string | null>(null);

  // カテゴリーのURLパラメータを取得する /category?name=Technology
  const searchParams = useSearchParams() || null;
  const categoryName = searchParams?.get("name");

  useEffect(() => {
    if (!categoryName) return;

    const fetchArticlesByCategory = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("createdAt", { ascending: false })
        .eq("categories", categoryName);

      if (data) {
        setPosts(data);
      }

      if (error) {
        console.log(error);
      }
    };
    fetchArticlesByCategory();
  }, [categoryName]);

  // console.log(categoryName);

  // 各カテゴリーの記事数を取得する
  useEffect(() => {
    const fetchCategoryName = async () => {
      const { data, error }: PostgrestResponse<any> = await supabase
        .from("posts")
        .select("categories");

      if (error) {
        console.log(error);
      }

      const categoryNameLength = (categoryNameFilter: string) => {
        const filteredData = data?.filter((item: { categories: string[] }) =>
          item.categories.includes(categoryNameFilter)
        );

        if (!filteredData) return;

        switch (categoryNameFilter) {
          case "Technology":
            setTecLen(filteredData?.length ?? 0);
            break;
          case "Automotive":
            setAutLen(filteredData?.length ?? 0);
            break;
          case "Finance":
            setFinLen(filteredData?.length ?? 0);
            break;
          case "Sports":
            setSpoLen(filteredData?.length ?? 0);
            break;
        }
      };
      categoryNameLength("Technology");
      categoryNameLength("Automotive");
      categoryNameLength("Finance");
      categoryNameLength("Sports");

    };
    fetchCategoryName();
  }, []);

  return (
    <div className="md:flex flex-grow">
      <section className="w-full md-2/3 flex-col items-center px-3">
        <ArticleList articles={posts} />
      </section>

      <aside className="w-full md:w-1/3 flex flex-col items-center px-3 md:pl-6">
        <div className="sticky top-0">
          <div className="bg-white shadow-md rounded p-4 mb-6 mt-4">
            <h3 className="font-bold text-gray-900 mb-2">About Me</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </div>
          <div className="bg-white shadow-md rounded p-4 mb-6 mt-4 w-full">
            <h3 className="font-bold text-gray-900 mb-2">
              <Link href="/">All Posts</Link>
            </h3>
            <ul className="text-gray-600 mt-2">
              <li>
                <Link href="/category?name=Technology">
                  Technology ({tecLen})
                </Link>
              </li>
              <li>
                <Link href="/category?name=Automotive">
                  Automotive ({autLen})
                </Link>
              </li>
              <li>
                <Link href="/category?name=Finance">Finance ({finLen})</Link>
              </li>
              <li>
                <Link href="/category?name=Sports">Sports ({spoLen})</Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CategoryBlogPage;
