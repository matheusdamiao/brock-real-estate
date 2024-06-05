import { createClient } from "@/utils/supabase/server";
import { PropertyType } from "../page";
import Image from "next/image";
import CarouselImages from "./../../components/CarouselImages";
import FloatingCTA from "./../../components/FloatingCTA";
import Comodidades from "./../../components/Comodidades";
import Proximidades from "./../../components/Proximidades";
import GoogleMaps from "./../../components/GoogleMaps";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default async function Page({ params }: { params: { imovel: string } }) {
  const supabase = createClient();
  const { data: property } = await supabase
    .from("property")
    .select("*")
    .eq("titulo", decodeURI(params.imovel).replace(/-/g, " "));

  return (
    <div className=" w-full  flex flex-col z-[55] bg-[#f3f5fa] ">
      {property &&
        property.map((prop: PropertyType) => {
          return (
            <div className="bg-tranparent w-full h-full">
              {/* <NavBar /> */}
              <Link href="/" className="btn absolute z-50 btn-ghost text-xl pl-4 pt-2 ">
                <Image
                  alt="logo Brock"
                  width={113}
                  height={51}
                  src="/icons/logo-brock-blue.svg"
                  className="lg:w-[113px] w-[80px]"
                />
              </Link>
              <CarouselImages imagens={prop.imagens} />

             <div className="flex max-w-7xl mx-auto pt-[50px]">
              <div className="relative flex flex-col  w-full justify-between max-w-7xl h-full  px-6 mx-auto ">
             

                <div className="max-w-[500px] gap-4 flex flex-col w-full">
                    <h1 className="text-[28px] lg:text-[42px] font-bold">
                      {prop.titulo}
                    </h1>
                    {prop.status && prop.status === true ? (
                      <div className="bg-[#ECEFF7] w-[120px] h-[20px] px-5 pt-5 pb-4 rounded-[9px] flex items-center justify-center gap-2">
                        <div className="bg-[#3C864C] rounded-full h-[15px] flex-0 flex-shrink-0 w-[15px] mb-1"></div>
                        <h4 className=" rounded-[9px] text-[#8C95AE] font-body text-sm ">
                          Disponível
                        </h4>
                      </div>
                    ) : (
                      <div className="bg-[#ECEFF7] w-[130px] h-[20px] px-4 pt-4 pb-3 rounded-[9px] flex items-center justify-center gap-2">
                        <div className="bg-[#5A6072] rounded-full h-[15px] flex-0 flex-shrink-0 w-[15px] mb-1"></div>
                        <h4 className=" rounded-[9px] text-[#8C95AE] font-body text-sm ">
                          Indisponível
                        </h4>
                      </div>
                    )}
                    {prop.construcao && prop.construcao === true ? (
                      <small>Em construção</small>
                    ) : null}

                    <div className="bg-[#ECEFF7]  py-4 px-4 flex gap-4 items-center rounded-[9px]">
                      <Image
                        width={33}
                        height={33}
                        alt="icon"
                        className="flex-0 flex-grow-0 flex-shrink-0"
                        src="/icons/Location.svg"
                      />
                      <h3 className="text-[#5A6072] font-body">
                        {" "}
                        {prop.endereco}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-2 max-w-[400px] pt-6">
                      {prop.salas && (
                        <div className="flex items-center gap-2 max-w-[150px] w-full">
                          <Image
                            className="flex-0 flex-grow-0 flex-shrink-0"
                            alt="icon"
                            width={33}
                            height={33}
                            src="/icons/room.svg"
                          />
                          <small className="text-[#8C95AE] font-body text-base">
                            {prop.salas} Salas
                          </small>
                        </div>
                      )}

                      {prop.metragem && (
                        <div className="flex items-center gap-2 max-w-[150px] w-full ">
                          <Image
                            className="flex-0 flex-grow-0 flex-shrink-0"
                            alt="icon"
                            width={33}
                            height={33}
                            src="/icons/ruler.svg"
                          />
                          <small className="text-[#8C95AE] font-body text-base">
                            {prop.metragem} m²
                          </small>
                        </div>
                      )}

                      {prop.vagas && (
                        <div className="flex items-center  gap-2 max-w-[150px] w-full ">
                          <Image
                            className="flex-0 flex-grow-0 flex-shrink-0"
                            alt="icon"
                            width={33}
                            height={33}
                            src="/icons/car.svg"
                          />
                          <small className="text-[#8C95AE] font-body text-base">
                            {prop.vagas} Vagas
                          </small>
                        </div>
                      )}

                      {prop.mobilia && (
                        <div className="flex items-center gap-2">
                          <Image
                            className="flex-0 flex-grow-0 flex-shrink-0"
                            alt="icon"
                            width={33}
                            height={33}
                            src="/icons/Chair.svg"
                          />
                          <small className="text-[#8C95AE] font-body text-base">
                            {prop.mobilia} Mobiliário
                          </small>
                        </div>
                      )}

                      {prop.andares && (
                        <div className="flex items-center gap-2 ">
                          <Image
                            className="flex-0 flex-grow-0 flex-shrink-0"
                            alt="icon"
                            width={33}
                            height={33}
                            src="/icons/Apartment.svg"
                          />
                          <small className="text-[#8C95AE] font-body text-base">
                            {prop.andares} Andares
                          </small>
                        </div>
                      )}

                      {prop.banheiro && (
                        <div className="flex items-center flex-nowrap gap-2 w-full">
                          <Image
                            className="flex-0 flex-grow-0 flex-shrink-0"
                            alt="icon"
                            width={33}
                            height={33}
                            src="/icons/Shower.svg"
                          />
                          <small className="text-[#8C95AE] font-body text-base w-full">
                            {prop.banheiro} banheiros
                          </small>
                        </div>
                      )}
                    </div>
                </div>
               
                
                
                <div className="max-w-[500px]">
                  <div className="h-full pb-[100px]">
                    <p className="text-[#494949] text-[28px] font-bold pt-10" >Descrição</p>
                    {prop.descricao}
                  </div>
                  <div className="h-full py-[100px]">
                    <p className="text-[#494949] text-[28px] font-bold">
                      Comodidades
                    </p>
                    <Comodidades comodidades={prop.comodidades} />
                  </div>

                

                  <div className="h-full py-[100px]">
                    <p className="text-[#494949] text-[28px] font-bold ">
                      Proximidades
                    </p>
                    <Proximidades
                      escolas={prop.escola}
                      transporte={prop.transporte}
                      hospital={prop.hospital}
                    />
                  </div>
                </div>
              
                
              </div>

              <FloatingCTA
                  IPTU={prop.IPTU}
                  condominio={prop.condominio}
                  preco={prop.preco}
                />

            </div> 
           
              
              <div className="max-w-7xl w-full m-auto px-6 pt-10">
                <div className="flex flex-col gap-4">
                  <p className="text-[#494949] text-[28px] font-bold">
                    Localização
                  </p>
                  <p className="text-[#5A6072] text-lg pb-4">{prop.endereco}</p>
                  <GoogleMaps endereco={prop.endereco} />
                </div>
              </div>

              <div className="py-[150px] w-full  px-6 gap-12 flex flex-col items-center justify-center">
                <div className="flex flex-col gap-4 max-w-[500px]">
                  <h4 className="text-[#494949] text-[32px] font-bold text-center">
                    Vamos agendar uma visita?
                  </h4>
                  <p className="text-[#5A6072] text-lg text-center w-[80%] m-auto">
                    Oportunidades únicas como essa não ficam disponíveis por
                    muito tempo.{" "}
                  </p>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap items-center justify-center  gap-6 w-full max-w-[600px] ">
                  <button className="btn-primary btn max-w-[250px] w-full">
                    {" "}
                    Agendar Visita
                  </button>
                  <button className="btn-secondary btn max-w-[250px] text-[#3C5086] w-full">
                    Compartilhar
                  </button>
                </div>
              </div>
              <Footer />
            </div>
          );
        })}
    </div>
  );
}
