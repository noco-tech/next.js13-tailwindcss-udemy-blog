
import CreateButton from "@/app/components/CreateButton";

const CreateBlogPage = async () => {

    // 新規投稿のAPI呼び出し(supabaseへの登録)
    const API_URL = process.env.API_URL;


  return (
    <div className="">
      <CreateButton API_URL={API_URL} />
    </div>
  );
};

export default CreateBlogPage;
