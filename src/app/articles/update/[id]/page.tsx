"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { categoriesSelectData } from "@/categoriesSelectData";

const UpdateBlogPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [id, setId] = useState<string>(params.id);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [categories, setCategories] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  // 詳細ページのAPI呼び出し(supabaseから)
  // useEffect(() => {
  //   const fetchDetailArticle = async () => {
  //     if (!id) return;
  //     const { data, error } = await supabase
  //       .from("posts")
  //       .select("*")
  //       .eq("id", id)
  //       .single();

  //     if (error) {
  //       console.log(error);
  //     } else {
  //       setId(data.id);
  //       setTitle(data.title);
  //       setContent(data.content);
  //     }
  //   }
  //   fetchDetailArticle();
  // }, [id]);

  // 詳細ページのAPI呼び出し(supabaseから)
  const fetchDetailData = useCallback(async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${API_URL}/api/blog/${params.id}`, {
      next: {
        revalidate: 10,
      },
    }); //ISR

    const detailArticle = await res.json();

    return detailArticle;

  }, [params.id])

  useEffect(() => {
    const fetchDetailArticle = async () => {
      if (!id) return;

      const detailArticle = await fetchDetailData();

      setId(detailArticle.id);
      setTitle(detailArticle.title);
      setContent(detailArticle.content);
      setCategories(detailArticle.categories);
    }
    fetchDetailArticle();
  }, [id, fetchDetailData]);




  // 投稿のupdate
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    // app/api/blog/[id]/route.tsから PUT呼び出したが、エラーのため、ここでupdateを呼び出す
    const { error: updateError } = await supabase
      .from("posts")
      .update({ title, content, categories })
      .eq("id", id);

    if (updateError) {
      console.log(updateError);
    }

    setLoading(false);
    router.push("/");
    router.refresh();
  };


  return (
    <div className="min-h-screen py-8 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-4">ブログ編集</h2>
      <form
        onSubmit={handleUpdate}
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
            disabled
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
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
            className="shadow border rounded w-full py-2 px-3 bg-customGray text-gray-700 leading-tight focus:outline-none"
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
            className="shadow border rounded w-full py-2 px-3 bg-customGray  text-gray-700 leading-tight focus:outline-none"
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
            className="text-gray-700 shadow p-2 bg-customGray  focus:outline-none rounded-md w-full"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          >
            {categoriesSelectData.map((data, index) => (
              <option selected key={index}>
                {data}
              </option>
            ))}
          </select>
        </div>

        <button
          className={`py-2 px-4 border text-customGray rounded-md ${
            loading
              ? "bg-red-600 cursor-not-allowed"
              : "bg-red-700 hover:bg-red-800"
          }  `}
          disabled={loading}
        >
          更新
        </button>
      </form>
    </div>
  );
};

export default UpdateBlogPage;
