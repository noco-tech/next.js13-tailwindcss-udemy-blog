"use client";

import { ArticleList } from "@/app/components/ArticleList";
import { Article } from "@/types";
import { supabase } from "@/utils/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

const CategoryBlogPage = () => {
  const [posts, setPosts] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const fetchArticlesByCategory = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("categories", router.query.name);

      if (data) {
        setPosts(data);
      }

      if (error) {
        console.log(error);
      }
    };
    fetchArticlesByCategory();
  }, [router.isReady, router.query]);

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
