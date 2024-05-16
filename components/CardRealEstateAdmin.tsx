"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

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

export default function CardRealEstateAdmin(prop: PropertyType) {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isTitle, setIsTitle] = useState("");

  const supabase = createClient();

  const editData = () => {
    if (isTitle !== prop.titulo) {
      setIsTitle(prop.titulo);
    }
  };

  React.useEffect(() => {
    editData();
  }, [isEdit]);

  const handleUpdate = async (e: FormEvent, id: number) => {
    e.preventDefault();

    setIsLoading(true);

    console.log("o novo titulo é esse", isTitle);

    const { error, data, status, statusText } = await supabase
      .from("property")
      .update({
        titulo: isTitle,
      })
      .eq("id", id)
      .select();

    if (error) {
    }

    if (data) {
      setTimeout(() => {
        setIsLoading(false);
        setIsUpdated(true);
      }, 1500);

      setTimeout(() => {
        setIsUpdated(false);
        router.refresh();
      }, 3500);
    }

    console.log("deu  erro", error);
    console.log("tem isso agora", data);
    console.log("esstatus", status);
    console.log("text status", statusText);
  };

  return (
    <>
      {!isEdit ? (
        <div
          key={prop.id}
          className="flex flex-col gap-6 shadow-xl border-[1px] border-gray w-full rounded-lg px-6 py-6 lg:px-12 lg:py-12 relative bg-[#F2F2F2]"
        >
          <button
            className="absolute right-5 top-5 border-[1px] text-lg btn btn-secondary"
            onClick={() => setIsEdit(!isEdit)}
          >
            Editar
          </button>
          <div className="flex justify-between lg:flex-nowrap flex-wrap">
            <div>
              <h2>{prop.titulo}</h2>
              <h3>{prop.status ? "Disponível" : "Indisponível"}</h3>
              <h3>{prop.construcao ? "Em construção" : null}</h3>
            </div>

            <div>
              {" "}
              <p className="max-w-[250px]">{prop.endereco}</p>
            </div>

            <div className="max-w-[400px]">
              Descrição
              <p className="text-clip line-clamp-2 ... overflow-hidden">
                {prop.descricao}
              </p>
            </div>
          </div>

          <div className="flex items-center lg:flex-nowrap flex-wrap  justify-between ">
            <div>
              <h3>Gerais</h3>
              <div className="grid lg:grid-cols-3 grid-cols-2  gap-x-6 ">
                <p>Salas: {prop.salas}</p>
                <p>Metragem: {prop.metragem}</p>
                <p>Vagas: {prop.vagas}</p>
                <p>Andares: {prop.andares}</p>
                <p>Banheiros: {prop.banheiro}</p>
                <p>{prop.mobilia ? "Mobilia" : null}</p>
              </div>
            </div>

            <div>
              <h3>Valores </h3>
              <div className="flex gap-2 lg:gap-10">
                <p>Preço: {prop.preco}</p>
                <p>Condomínio:{prop.condominio}</p>
                <p>IPTU:{prop.IPTU}</p>
              </div>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col items-center justify-between">
            <div>
              <h3>Comodidades</h3>
              <div className="grid grid-cols-2">
                {prop.comodidades.map((cmd, index) => {
                  return <div key={index}>{cmd}</div>;
                })}
              </div>
            </div>
            <div className="flex flex-col gap-6 py-6 ">
              <div className="flex flex-col">
                <div className="flex lg:flex-row flex-col items-center gap-2 lg:gap-4">
                  <img
                    src="/icons/escolas.svg"
                    className="flex-0 flex-grow-0 flex-shrink-0 w-[25px]"
                  />
                  <h4 className="text-[#8C95AE] font-normal text-lg">
                    Escolas
                  </h4>
                  <p className="lg:text-left text-center">{prop.escola}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex lg:flex-row flex-col items-center gap-2 lg:gap-4">
                  <img
                    src="/icons/hospital.svg"
                    className="flex-0 flex-grow-0 flex-shrink-0 w-[25px]"
                  />
                  <h4 className="text-[#8C95AE] font-normal text-lg">
                    Hospital
                  </h4>
                  <p className="lg:text-left text-center">{prop.hospital}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex lg:flex-row flex-col items-center gap-2 lg:gap-4">
                  <img
                    src="/icons/transport.svg"
                    className="flex-0 flex-grow-0 flex-shrink-0 w-[25px]"
                  />
                  <h4 className="text-[#8C95AE] font-normal text-lg">
                    Transporte
                  </h4>

                  <p className="lg:text-left text-center">{prop.transporte}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => handleUpdate(e, prop.id)}
          key={prop.id}
          className="flex flex-col gap-6 shadow-xl border-[1px] border-gray rounded-lg px-12 py-12 relative"
        >
          <button
            className="absolute right-5 top-5 border-[1px] text-lg btn btn-secondary"
            onClick={() => setIsEdit(!isEdit)}
          >
            Voltar
          </button>
          <div className="flex justify-between">
            <div>
              <input
                type="text"
                value={isTitle}
                className=" px-2 py-2 rounded-lg bg-[#E6E7EB]"
                onChange={(e) => setIsTitle(e.target.value)}
              />
              <h3>{prop.status ? "Disponível" : "Indisponível"}</h3>
              <h3>{prop.construcao ? "Em construção" : null}</h3>
            </div>

            <p className="max-w-[250px]">{prop.endereco}</p>

            <div className="max-w-[400px]">
              Descrição
              <p className="text-clip line-clamp-2 ... overflow-hidden">
                {prop.descricao}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between ">
            <div>
              <h3>Gerais</h3>
              <div className="grid grid-cols-3  gap-x-6 ">
                <p>Salas: {prop.salas}</p>
                <p>Metragem: {prop.metragem}</p>
                <p>Vagas: {prop.vagas}</p>
                <p>Andares: {prop.andares}</p>
                <p>Banheiros: {prop.banheiro}</p>
                <p>{prop.mobilia ? "Mobilia" : null}</p>
              </div>
            </div>

            <div>
              <h3>Valores </h3>
              <div className="flex gap-10">
                <p>Preço: {prop.preco}</p>
                <p>Condomínio:{prop.condominio}</p>
                <p>IPTU:{prop.IPTU}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3>Comodidades</h3>
              <div className="grid grid-cols-2">
                {prop.comodidades.map((cmd, index) => {
                  return <div key={index}>{cmd}</div>;
                })}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <img
                    src="/icons/escolas.svg"
                    className="flex-0 flex-grow-0 flex-shrink-0 w-[25px]"
                  />
                  <h4 className="text-[#8C95AE] font-normal text-lg">
                    Escolas
                  </h4>
                  <p>{prop.escola}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <img
                    src="/icons/hospital.svg"
                    className="flex-0 flex-grow-0 flex-shrink-0 w-[25px]"
                  />
                  <h4 className="text-[#8C95AE] font-normal text-lg">
                    Hospital
                  </h4>
                  <p>{prop.hospital}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <img
                    src="/icons/transport.svg"
                    className="flex-0 flex-grow-0 flex-shrink-0 w-[25px]"
                  />
                  <h4 className="text-[#8C95AE] font-normal text-lg">
                    Transporte
                  </h4>

                  <p>{prop.transporte}</p>
                </div>
              </div>
            </div>
          </div>
          <button
            className="bottom-5 left-5 px-4 py-4 w-full bg-primary text-white rounded-[9px] disabled:bg-secondary disabled:text-[#5A6072]"
            disabled={isTitle !== prop.titulo ? false : true}
            type="submit"
          >
            {!isLoading && !isUpdated
              ? "Salvar"
              : isLoading
              ? "Carregando..."
              : isUpdated
              ? "Atualizado!"
              : "Salvar"}
          </button>
        </form>
      )}
    </>
  );
}
