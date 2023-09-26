import { supabase } from "@/utils/supabaseClient";
import { PostgrestResponse } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// カテゴリーの記事数を取得
export async function GET(req: Request, res: NextApiResponse) {
  const query = `
    SELECT
    categories.name,
    COUNT(posts.id) AS count
  `;

  const { data, error }: PostgrestResponse<any> = await supabase.rpc(
    "get_category_counts"
  );

  if (error) {
    return NextResponse.json(error);
  }

  // console.log(data);

  return NextResponse.json(data, { status: 200 });
}


//   const { data: categoryLength, error } = await supabase
//     .from("posts")
//     .select("categories");

//   if (error) {
//     return NextResponse.json(error);
//   }

//   return NextResponse.json(categoryLength, { status: 200 });
