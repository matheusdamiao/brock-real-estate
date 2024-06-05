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
  IPTU: number;
  condominio: number;
  comodidades: string[];
  transporte: string;
  hospital: string;
  escola: string;
  imagens: string[];
}

export default async function StatisticsPage() {
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
        <nav className="w-full flex flex-col lg:flex-row flex-wrap lg:flex-nowrap justify-center border-b border-b-foreground/10 h-16 max-w-7xl m-auto">
          <AuthButton />
        </nav>
      </div>

      <div className="animate-in flex-col flex lg:gap-12 opacity-0 max-w-7xl w-full px-6 gap-4">
      
        
        <main className="flex gap-24 py-[20px] flex-wrap flex-col w-full ">
          <div className="bg-[#F2F2F2] shadow-xl max-w-[500px] w-full px-6 py-6  lg:px-8 rounded-[9px] lg:py-8">
            <div className="flex items-center justisfy-evenly justify-between  ">
              <div>
                <h3 className="text-[#8C95AE] text-base font-body font-normal">
                  Total
                </h3>
                <h2 className="text-[#111726] text-3xl">42</h2>
              </div>

              <div>
                <h3 className="text-[#8C95AE] text-base font-body">
                  Disponíveis
                </h3>
                <h2 className="text-[#111726] text-3xl">2</h2>
              </div>

              <div>
                <h3 className="text-[#8C95AE] text-base font-body">
                  Em construção
                </h3>
                <h2 className="text-[#111726] text-3xl">6</h2>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
