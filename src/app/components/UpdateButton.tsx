"use client";

import { useRouter } from "next/navigation";


type updateProps = {
  id: string;
  API_URL: string | undefined;
};

export const UpdateButton = ({ id, API_URL }: updateProps) => {
  const router = useRouter();

  const handleUpdate = async () => {
    
    router.push(`${API_URL}/articles/update/${id}`);
    router.refresh();
  };

  return (
    <div
      className="bg-green-600 hover:bg-green-700 rounded-md py-2 px-5 inline cursor-pointer"
      onClick={handleUpdate}
    >
      編集
    </div>
  );
};
