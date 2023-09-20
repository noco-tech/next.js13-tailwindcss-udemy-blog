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

  const { data: posts, error } = await supabase.from("posts").select("*").eq("id", id).single();

  // console.log(posts)
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!posts) {
    notFound();
  }

  return res.status(200).json(posts);
}
