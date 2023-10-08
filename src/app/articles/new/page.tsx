"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { categoriesSelectData } from "@/categoriesSelectData";

const CreateBlogPage = () => {
  const router = useRouter();


  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [categories, setCategories] = useState<string>("Technology");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    // 新規投稿のAPI (json-server)
    // const article = await createArticle(id, title, content);
    // console.log(article);

    // 新規投稿のAPI呼び出し(supabaseへの登録)
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    await fetch(`${API_URL}/api/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        content,
        categories,
      }),
    });

    setLoading(false);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-4">ブログ新規作成</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-200 p-6 rounded shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="url" className="text-gray-700 text-sm font-bold mb-2">
            URL
          </label>
          <input
            type="text"
            id="url"
            onChange={(e) => setId(e.target.value)}
            value={id}
            className={`bg-customGray
            shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="text-gray-700 text-sm font-bold mb-2"
          >
            タイトル
          </label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="bg-customGray shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="text"
            className="text-gray-700 text-sm font-bold mb-2"
          >
            本文
          </label>
          <textarea
            id="text"
            rows={11}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="bg-customGray shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>

        <label
          htmlFor="category"
          className="text-gray-700 text-sm font-bold mb-2"
        >
          カテゴリー
        </label>
        <div className="mb-3 focus:outline-none">
          <select
            id="category"
            value={categories}
            className="bg-customGray text-gray-700 shadow p-2 focus:outline-none rounded-md w-full"
            onChange={(e) => setCategories(e.target.value)}
          >
            {categoriesSelectData.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </div>

        <button
          className={`py-2 px-4 border rounded-md text-customGray ${
            loading
              ? "bg-red-600 cursor-not-allowed"
              : "bg-secondary hover:bg-red-800"
          }  `}
          disabled={loading}
        >
          投稿
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
