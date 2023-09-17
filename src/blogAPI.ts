import { notFound } from "next/navigation"
import { Article } from "./types"

//json-serverからssrで全記事取得API
export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch("http://localhost:3001/posts", { cache: "no-store" }) //・no-storeはSSRでキャッシュしない ・SSGはforce-cache　・ISRはnext: { revalidate: 3 }でキャッシュ

  if (!res.ok) {
    throw new Error("エラーが発生したため記事を取得できませんでした。")
  }

  await new Promise((resolve) => setTimeout(resolve, 500)); //1秒かけてjsonを取得する 意図的にローディングを発生させる

  const articles = await res.json()
  return articles
}

//詳細ページ取得API
export const getDetailArticle = async (id: string): Promise<Article> => {
  const res = await fetch(`http://localhost:3001/posts/${id}`, { next: { revalidate: 60} }); //ISR


  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("エラーが発生したため記事を取得できませんでした。");
  }

  await new Promise((resolve) => setTimeout(resolve, 500)); //1秒かけてjsonを取得する 意図的にローディングを発生させる

  const article = await res.json();
  return article;
};

//記事作成API
export const createArticle = async (id: string, title: string, content: string): Promise<Article> => {
  const currentDatetime = new Date().toISOString();

  const res = await fetch(`http://localhost:3001/posts`, {
    method: "POST",
    body: JSON.stringify({ id, title, content, createdAt: currentDatetime }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("エラーが発生したため記事を取得できませんでした。");
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  const newArticle = await res.json();
  return newArticle;

}
