
import { Article } from "./types"

//json-serverからssrで全記事取得
export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch("http://localhost:3001/posts", { cache: "no-store" }) //・no-storeはSSRでキャッシュしない ・SSGはforce-cache　・ISRはnext: { revalidate: 3 }でキャッシュ

  if (!res.ok) {
    throw new Error("エラーが発生したため記事を取得できませんでした。")
  }

  await new Promise((resolve) => setTimeout(resolve, 500)); //1秒かけてjsonを取得する 意図的にローディングを発生させる

  const articles = await res.json()
  return articles
}
