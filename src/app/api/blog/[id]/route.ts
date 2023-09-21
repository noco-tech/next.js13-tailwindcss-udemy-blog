// next.js公式ページRoute Handlersより
import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

// appディレクトリに書く場合 詳細記事取得
export async function GET(req: Request, res: NextApiResponse) {
  // 詳細ページの表示に必要なidを取得 req.urlに変更
  const id = req.url.split("/blog/")[1];
  // console.log(req.url.split("/blog/")[1])

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  // console.log(posts)



  if (error) {
    return NextResponse.json(error);
  }

  if (!posts) {
    notFound();
  }

  return NextResponse.json(posts, { status: 200 });
  /* messageつける場合
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  */
}

// appディレクトリに書く場合 削除用API
export async function DELETE(req: Request, res: NextApiResponse) {
  // 詳細ページの表示に必要なidを取得 req.urlに変更
  const id = req.url.split("/blog/")[1];

  const { error: deleteError } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json(deleteError);
  }

  return NextResponse.json( { status: 200 });
}
