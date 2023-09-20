import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
  },
});

/* ! - non-null assertion operator -
コンパイラにこの値はnull,undefinedではなないと伝えるもの。
(絶対にあるよと伝える)
使いすぎ注意。丁寧に書くならtype guardで型を絞り込んだ方が良い。 */

// または、空文字で対応可
