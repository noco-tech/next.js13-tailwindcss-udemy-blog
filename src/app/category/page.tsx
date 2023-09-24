"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { Article } from "@/types";

import { ArticleList } from "@/app/components/ArticleList";
// import { useRouter } from "next/router";

const CategoryBlogPage = () => {
  const [posts, setPosts] = useState<Article[]>([]);
  // const [name, setName] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const categoryName = searchParams.get("name");

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
            <h3 className="font-bold text-gray-900 mb-2">Category</h3>
            <ul className="text-gray-600 mt-2">
              <li>
                <Link href="/category?name=Technology">Technology</Link>
              </li>
              <li>
                <Link href="/category?name=Automotive">Automotive</Link>
              </li>
              <li>
                <Link href="/category?name=Finance">Finance</Link>
              </li>
              <li>
                <Link href="/category?name=Sports">Sports</Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CategoryBlogPage;
