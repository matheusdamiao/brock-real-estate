import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function AllFiles() {
  const supabase = createClient();

  const { data, error } = await supabase.storage.from("brock").list("imoveis", {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  console.log(data);

  return (
    <div className="w-full h-[200px] flex">
      {data?.map((file) => (
        <img
          width={500}
          height={500}
          alt=""
          src={`https://lqkcetrqfmsvcgxakfqv.supabase.co/storage/v1/object/public/brock/imoveis/${file.name}`}
        />
      ))}
    </div>
  );
}
