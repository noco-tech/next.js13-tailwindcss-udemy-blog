"use client";

import { useRouter } from "next/navigation";


type updateProps = {
  id: string;
};

export const UpdateButton = ({ id }: updateProps) => {
  const router = useRouter();

  const handleUpdate = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
