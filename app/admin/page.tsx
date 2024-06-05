import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import CardRealEstateAdmin from "@/components/CardRealEstateAdmin";
import CreateNewProperty from "@/components/CreateNewProperty";
import Link from "next/link";
import Image from "next/image";

export interface PropertyType {
  id: number;
  created_at: string;
  titulo: string;
  status: boolean;
  construcao: boolean;
  endereco: string;
  salas: number;
  metragem: number;
  vagas: number;
  andares: number;
  banheiro: number;
  mobilia: boolean;
  descricao: string;
  preco: string;
  IPTU: string;
  condominio: string;
  comodidades: string[];
  transporte: string;
  hospital: string;
  escola: string;
  imagens: string[];
}

export default async function ProtectedPage() {
  const supabase = createClient();

  const { data: property } = await supabase.from("property").select();
  console.log(property);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12 lg:gap-20 items-center bg-[#ECEFF7] ">
      <div className="w-full">
        <nav className="w-full h-full flex flex-col lg:flex-row flex-wrap lg:flex-nowrap justify-center border-b border-b-foreground/10 h-16 max-w-7xl m-auto">
          <AuthButton />
        </nav>
      </div>

      <div className="animate-in flex-col flex lg:gap-12 items-end opacity-0 max-w-7xl w-full px-6 gap-4">
        <div>
          <Link href="/admin/create" className="btn btn-primary self-end ">
            Adicionar Novo Imóvel
          </Link>
        </div>
        
        <main className="flex gap-24 pb-[100px] flex-wrap flex-col w-full ">
          {property?.map((prop: PropertyType) => {
            return <CardRealEstateAdmin key={prop.id} {...prop} />;
          })}
        </main>
      </div>
    </div>
  );
}
