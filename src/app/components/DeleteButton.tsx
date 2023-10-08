"use client";

import { useRouter } from "next/navigation";

type deleteProps = {
  id: string;
};

export const DeleteButton = ({ id }: deleteProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    // json-serverからの削除
    // await deleteArticle(id);

    // supabaseからの削除
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    await fetch(`${API_URL}/api/blog/${id}`, {
      method: "DELETE",
    });

    router.push("/");
    router.refresh();
  }


  return <div className="bg-red-500 hover:bg-red-600 rounded-md py-2 px-5 inline cursor-pointer" onClick={handleDelete}>削除</div>;
};
