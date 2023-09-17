import { Article } from "./types"

//json-serverからssrで全記事取得
export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch("http://localhost:3001/posts", { cache: "no-store"}) //・no-storeはSSRでキャッシュしない ・SSGはforce-cache　・ISRはnext: { revalidate: 3 }でキャッシュ
  const articles = await res.json()
  return articles
}
