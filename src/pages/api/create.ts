// // next.js公式ページAPI Routesより
// import { supabase } from "@/utils/supabaseClient";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // 投稿に必要な属性を取得
//   const { id, title, content } = req.body;

//   // 記事投稿用のAPI
//   const { data: posts, error } = await supabase
//     .from("posts")
//     .insert([{
//       id,
//       title,
//       content,
//       createdAt: new Date().toISOString(),
//     }])


//   // console.log(posts)
//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }


//   return res.status(200).json(posts);
// }
