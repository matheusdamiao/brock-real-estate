import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

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

export default async function Index() {
  const supabase = createClient();
  const { data: property } = await supabase.from("property").select();
  console.log(property);

  return (
    <div className="bg-white flex-1 w-full flex flex-col items-center h-full relative ">
      <NavBar />

      <div className="h-[500px] w-full">
        <div className=" flex-1 flex flex-col gap-20 w-full relative h-full max-h-[500px] lg:h-[900px]">
          <Image
            // width={1461}
            // height={516}
            className="lg:object-bottom"
            fill
            objectFit="cover"
            alt="hero image"
            src="/images/bg-hero-home.webp"
          />
          <Header />
        </div>
      </div>
      {/* <div className="absolute top-0 flex flex-nowrap w-full gap-[20px] h-full opacity-40">
        <div className="span h-full w-[2px] bg-[#E1E7F9] absolute left-0 ml-[5svw]"></div>
        <div className="span h-full w-[2px] bg-[#E1E7F9] absolute right-0 mr-[5svw]"></div>
        <div className="span w-full h-[2px] bg-[#E1E7F9] absolute top-0 mt-[10svh] lg:mt-[5svw]"></div>
      </div> */}
      <div className="flex py-[100px] px-6 items-center justify-center gap-10 max-w-7xl lg:flex-nowrap flex-wrap z-[54]">
        {property?.map((property: PropertyType) => {
          return (
            <Link
              key={property.id}
              href={encodeURI(property.titulo.replace(/ /g, "-"))}
              className="group min-w-[250px] w-full sm:min-w-[400px] sm:w-full xl:w-[590px] h-[400px] relative rounded-lg"
            >
              <Image
                fill
                className="rounded-lg object-cover group-hover:brightness-50 transition-all"
                alt="image1"
                src={property.imagens[0]}
              />
              <div className="group-hover:flex flex-col px-6 py-6 w-full hidden items-end justify-endereco absolute bottom-0 ">
                <h3 className="text-white text-2xl"> {property.titulo}</h3>
                <h2> R$ {property.preco}</h2>
                <div className="flex items-center">
                  <Image
                    width={31}
                    height={31}
                    alt=""
                    src="/icons/Location.svg"
                    className="flex-0 flex-grow-0 flex-shrink-0"
                  />
                  <p>{property.endereco}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
