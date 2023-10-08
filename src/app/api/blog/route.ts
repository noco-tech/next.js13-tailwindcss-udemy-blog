// next.js公式ページRoute Handlersより
import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// appディレクトリに書く場合 全記事取得
export async function GET(req: Request, res: NextApiResponse) {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("createdAt", { ascending: false });

  // console.log(posts)
  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json(posts, { status: 200 });
  /* messageつける場合
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  */
}

// appディレクトリに書く場合 投稿API
export async function POST(req: Request, res: NextApiResponse) {
  // 投稿に必要な属性を取得
  const { id, title, content, categories } = await req.json();

  // 記事投稿用のAPI 初期値を設定
  const { data: posts, error } = await supabase.from("posts").insert([
    {
      id,
      title,
      content,
      categories,
      createdAt: new Date().toISOString(),
    },
  ]);


  // console.log(posts)
  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json(posts, { status: 201 });
}


