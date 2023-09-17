
import { Article } from "./types"

//json-serverからssrで全記事取得
export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch("http://localhost:3001/posts", { cache: "no-store" }) //・no-storeはSSRでキャッシュしない ・SSGはforce-cache　・ISRはnext: { revalidate: 3 }でキャッシュ

  if (!res.ok) {
    throw new Error("エラーが発生したため記事を取得できませんでした。")
  }

  const articles = await res.json()
  return articles
}
