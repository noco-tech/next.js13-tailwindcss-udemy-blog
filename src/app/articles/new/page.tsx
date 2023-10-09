
import CreatePage from "@/app/components/CreatePage";

const CreateBlogPage = async () => {

    // 新規投稿のAPI呼び出し(supabaseへの登録)
    const API_URL = process.env.API_URL;


  return (
    <div className="">
      <CreatePage API_URL={API_URL} />
    </div>
  );
};

export default CreateBlogPage;
