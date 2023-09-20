// next.js公式ページAPI Routesより
import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { notFound } from "next/navigation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 詳細ページの表示に必要なidを取得
  const { id } = req.query;

  // 投稿の詳細ページ取得、更新、削除用API
  switch (req.method) {
    case "GET": // 詳細ページの表示
      const { data: posts, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      // console.log(posts)
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (!posts) {
        notFound();
      }

      return res.status(200).json(posts);

    case "PUT": // 更新用API
      const { title, content } = req.body;
      const { error: updateError } = await supabase
        .from("posts")
        .update({ title, content })
        .eq("id", id);

      if (updateError) {
        return res.status(500).json({ error: updateError.message });
      }

      return res.status(200).json(posts);

    case "DELETE": // 削除用API
      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

      if (deleteError) {
        return res.status(500).json({ error: deleteError.message });
      }
      return res.status(200).json({ message: "削除に成功しました" });
  }
}
