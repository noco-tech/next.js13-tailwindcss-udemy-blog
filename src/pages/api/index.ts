// next.js公式ページAPI Routesより
import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data: posts, error } = await supabase.from("posts").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(posts)
}
