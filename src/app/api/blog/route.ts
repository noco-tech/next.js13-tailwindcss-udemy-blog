// next.js公式ページRoute Handlersより
import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// appディレクトリに書く場合 全記事取得
export async function GET(req: Request, res: NextApiResponse) {
  const { data: posts, error } = await supabase.from("posts").select("*");

  // console.log(posts)
  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json(posts);
  /* messageつける場合
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  */
}
