import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import MeetTheNeighbors from "@/components/meetTheNeighbors";
import CarouselCardsHome from "@/components/carouselCardsHome";

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
      {/* lg:object-[0_-380px] */}
      <div className="h-[500px] w-full">
        <div className=" flex-1 flex flex-col gap-20 w-full relative h-full lg:h-[600px] max-h-[450px]">
          <Image
            className=" absolute top-0 left-0 right-0 h-full"
            fill
            objectFit="cover"
            alt="hero image"
            src="/images/hero-dark.webp"
          />
          <Header />
        </div>
      </div>
     
      <div className="flex lg:pt-[80px] pb-[100px] px-6 items-center justify-center gap-20 max-w-7xl  flex-wrap z-[54]">
        {property?.map((property: PropertyType) => {
          return (
            <div className="flex w-full lg:flex-nowrap flex-wrap gap-6 lg:gap-12">
              <Link
                key={property.id}
                href={encodeURI(property.titulo.replace(/ /g, "-"))}
                className="flex-0 min-w-[250px] w-full sm:min-w-[400px] sm:w-full h-[250px] lg:h-[400px] relative rounded-lg"
              > 

                <CarouselCardsHome images={property.imagens}/>

                  {property.status &&
                    <div className="flex items-center absolute z-[88888888] bottom-4 right-4 py-2 px-4  mt-[20px] gap-2 bg-[#eef1fa] max-w-[130px] rounded-[9px]" >
                      <span className="bg-[#3C864C] animate-pulse  w-[14px] h-[14px] rounded-full flex-0 flex-grow-0 flex-shrink-0"></span>
                      <p className="text-[#8C95AE]">Disponível</p>
                   </div>
                  }
                
              </Link>

              <div className="flex-col px-0 lg:px-6 w-full items-end  ">
                <h3 className="text-[#8C95AE] text-xl lg:text-3xl"> {property.titulo}</h3>
                <h2 className="text-[#111726] text-lg lg:text-2xl font-bold lg:pt-2"> R$ {property.preco}</h2>
                <div className="flex items-center gap-2 lg:gap-4 py-6 ">
                  <Image
                    width={31}
                    height={31}
                    alt=""
                    src="/icons/Location.svg"
                    className="flex-0 flex-grow-0 flex-shrink-0 w-[25px] lg:w-[33px]"
                  />
                  <p className="text-[#8C95AE] font-body text-base lg:text-xl">{property.endereco}</p>
                </div>
                <div className="grid grid-cols-2 gap-y-2 gap-x-2 max-w-[400px] lg:pt-6">
                    {property.salas && (
                      <div className="flex items-center gap-2 max-w-[150px] w-full">
                        <Image
                          className="flex-0 flex-grow-0 flex-shrink-0 w-[25px] lg:w-[33px]"
                          alt="icon"
                          width={33}
                          height={33}
                          src="/icons/room.svg"
                        />
                        <small className="text-[#8C95AE] font-body text-base">
                          {property.salas} Salas
                        </small>
                      </div>
                    )}

                    {property.metragem && (
                      <div className="flex items-center gap-2 max-w-[150px] w-full ">
                        <Image
                          className="flex-0 flex-grow-0 flex-shrink-0 w-[25px] lg:w-[33px]"
                          alt="icon"
                          width={33}
                          height={33}
                          src="/icons/ruler.svg"
                        />
                        <small className="text-[#8C95AE] font-body text-base">
                          {property.metragem} m²
                        </small>
                      </div>
                    )}

                    {property.vagas && (
                      <div className="flex items-center  gap-2 max-w-[150px] w-full ">
                        <Image
                          className="flex-0 flex-grow-0 flex-shrink-0 w-[25px] lg:w-[33px]"
                          alt="icon"
                          width={33}
                          height={33}
                          src="/icons/car.svg"
                        />
                        <small className="text-[#8C95AE] font-body text-base">
                          {property.vagas} Vagas
                        </small>
                      </div>
                    )}

                    {property.mobilia && (
                      <div className="flex items-center gap-2">
                        <Image
                          className="flex-0 flex-grow-0 flex-shrink-0 w-[25px] lg:w-[33px]"
                          alt="icon"
                          width={33}
                          height={33}
                          src="/icons/Chair.svg"
                        />
                        <small className="text-[#8C95AE] font-body text-base">
                          {property.mobilia} Mobiliário
                        </small>
                      </div>
                    )}

                    {property.andares && (
                      <div className="flex items-center gap-2 ">
                        <Image
                          className="flex-0 flex-grow-0 flex-shrink-0 w-[25px] lg:w-[33px]"
                          alt="icon"
                          width={44}
                          height={44}
                          src="/icons/Apartment.svg"
                        />
                        <small className="text-[#8C95AE] font-body text-base">
                          {property.andares} Andares
                        </small>
                      </div>
                    )}

                    {property.banheiro && (
                      <div className="flex items-center flex-nowrap gap-2 w-full">
                        <Image
                          className="flex-0 flex-grow-0 flex-shrink-0 w-[25px] lg:w-[33px]"
                          alt="icon"
                          width={44}
                          height={44}
                          src="/icons/Shower.svg"
                        />
                        <small className="text-[#8C95AE] font-body text-base w-full">
                          {property.banheiro} banheiros
                        </small>
                      </div>
                    )}
                  </div>
                 
                 
              </div>
            </div>
          );
        })}
      </div>
      <MeetTheNeighbors/>
      <ContactSection/>
      <Footer />
    </div>
  );
}
