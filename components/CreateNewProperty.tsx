"use client";
import { removeDiacritics } from "@/utils/removeDiacritics";
import { createClient } from "@/utils/supabase/client";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

interface SupabaseUploadResponse {
  data: { path: string; fullPath: string } | null;
  error: any | null;
}

interface PropTypes {
  steps: StepsTypes;
  setSteps: React.Dispatch<React.SetStateAction<StepsTypes>>;
}

enum StepsTypes {
  first = "FIRST",
  second = "SECOND",
  third = "THIRD",
  fourth = "FOURTH",
}

export default function CreateNewProperty(props: PropTypes) {
  const [steps, setSteps] = useState<StepsTypes>(StepsTypes.first);

  const [status, setStatus] = useState("");
  const [titulo, setTitulo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");

  const [salas, setSalas] = useState<number>(0);
  const [metragem, setMetragem] = useState<number>(0);
  const [andares, setAndares] = useState<number>(0);
  const [vagas, setVagas] = useState<number>(0);
  const [banheiros, setBanheiros] = useState<number>(0);

  const [preco, setPreco] = useState<number>(0);
  const [condo, setCondo] = useState<number>(0);
  const [iptu, setIptu] = useState<number>(0);

  const [construction, setConstruction] = useState<boolean>(false);
  const [mobilia, setMobilia] = useState<boolean>(false);

  const [comodidade, setComodidade] = useState<string>("");
  const [selectedComodidades, setSelectedComodidades] = useState<string[]>([]);
  const [selectComodidade, setSelectComodidade] = useState<string>("");

  const [comodidades, setComodidades] = useState<string[]>();

  const [school, setSchool] = useState<string>();
  const [transport, setTransport] = useState<string>();
  const [hospital, setHospital] = useState<string>();


  const [imagens, setImagens] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([])
  const supabase = createClient();



  // ////////////////////

  useEffect(() => {
    const getComodidades = async () => {
      const { data: comodidades, error } = await supabase
        .from("property")
        .select("comodidades");

      console.log(comodidades);

      const allComodidades: string[] = [];
      comodidades?.forEach((obj) => {
        allComodidades.push(...obj.comodidades);
      });
      const uniqueComodidades: string[] = allComodidades.filter(
        (value, index, self) => {
          return self.indexOf(value) === index;
        }
      );
      setComodidades(uniqueComodidades);
    };

    getComodidades();
  }, []);

  // ///////////////
  const handleForm = async () => {
    const { data, error } = await supabase
    .from('property')
    .insert({ titulo: titulo, 
              status: status === 'disponivel', 
              construcao: construction, 
              endereco: endereco,
              descricao: descricao,
              salas: salas,
              metragem: metragem,
              vagas: vagas,
              andares: andares,
              banheiro: banheiros,
              mobilia: mobilia,
              preco: preco,
              condominio: condo,
              IPTU: iptu,
              comodidades: selectedComodidades,
              transporte: transport,
              hospital: hospital,
              escola: school,
              imagens: imagens
            })
      .select();

      if(data){
        console.log(data);
        alert("imóvel Criado!")
      }
      if(error){
        console.log(error),
        alert('deu erro :(')
      }
  };


  // ///////////////////////////

  const handleSteps = (e: string) => {
    if (e === "first") {
      props.setSteps(StepsTypes.first);
      setSteps(StepsTypes.first);
    }

    if (e === "second") {
      props.setSteps(StepsTypes.second);
      setSteps(StepsTypes.second);
    }

    if (e === "third") {
      props.setSteps(StepsTypes.third);
      setSteps(StepsTypes.third);
    }

    if (e === "fourth") {
      props.setSteps(StepsTypes.fourth);
      setSteps(StepsTypes.fourth);
    }
  };

  // ///////////////////////////////

  const addComodidade = () => {
    setSelectedComodidades((prevComodidades) => {
      // Check if selectComodidade is already present in the state
      const isPresent = prevComodidades.includes(selectComodidade);

      // If it's present, remove it; otherwise, add it
      if (isPresent) {
        return prevComodidades.filter(
          (comodidade) => comodidade !== selectComodidade
        );
      } else {
        return [...prevComodidades, selectComodidade];
      }
    });
  };

  useEffect(() => {
    if (selectComodidade !== "") {
      addComodidade();
    }

    console.log(selectedComodidades);
  }, [selectComodidade]);


  const uploadFile = async ( event: ChangeEvent & { target: HTMLInputElement }) =>{
    if (event.target.files && event.target.files?.length) {
      const file = event.target?.files[0];

      const cleanedStorageFolderName = removeDiacritics(titulo);

      const cleanedFileName = removeDiacritics(file.name);
     


      const bucket = `brock/imoveis/${cleanedStorageFolderName}`;

      // Call Storage API to upload file
      const data = await supabase.storage
        .from(bucket)
        .upload(cleanedFileName, file);

        const castedResponse = data as SupabaseUploadResponse;


      if(castedResponse.data){
        console.log('tem resposta aqui', castedResponse);
        setImagens((imgs)=> [...imgs, `https://lqkcetrqfmsvcgxakfqv.supabase.co/storage/v1/object/public/${castedResponse.data?.fullPath}`])
        alert("File uploaded successfully!");
        setFileNames((prev)=> [...prev, cleanedFileName])
      }

      // Handle error if upload failed
      if(castedResponse.error){
        console.log(castedResponse.error);
        alert('deu erro!')
      }

    }


  }

 const deleteImage = async (url: string) =>{

  const cleanedStorageFolderName = removeDiacritics(titulo);

  const path = fileNames.find(name => url.includes(name))

  console.log(path);

  // const bucket = `brock/imoveis/${cleanedStorageFolderName}`;

    const { data, error } = await supabase
    .storage
    .from('brock')
    .remove([`imoveis/${cleanedStorageFolderName}/${path}`])

    if(data){
      console.log(data);
      setFileNames(prevName => prevName.filter(image => image !== path));
      setImagens((imgs)=> imgs.filter(img => img !== url))
    }
    if(error){
      console.log(error)
    }
 }


  return (
    <form
      // onSubmit={handleForm}
      className="bg-[#F2F2F2] shadow-xl max-w-[500px] w-full px-6 py-6 h-full "
    >
      {steps === StepsTypes.first && (
        <div>
          <h3 className="text-center pb-[15px] text-[#2B3040]">
            Informações Gerais
          </h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo" className="text-[#8C95AE]">
              {" "}
              Nome do Imóvel
            </label>
            <input
              type="text"
              id="titulo"
              className="px-2 py-2 rounded-[9px]"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 pt-6">
            <label htmlFor="titulo" className="text-[#8C95AE]">
              {" "}
              Status
            </label>
            <div className="flex gap-5">
              <label
                htmlFor="titulo"
                className="text-[#8C95AE] text-sm flex items-center gap-1"
              >
                {" "}
                Disponível
                <input
                  type="radio"
                  className="px-2 py-2 rounded-[9px] "
                  value="disponivel"
                  checked={status === "disponivel"}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </label>
              <label
                htmlFor="titulo"
                className="text-[#8C95AE] text-sm flex items-center gap-1 "
              >
                {" "}
                Indisponível
                <input
                  type="radio"
                  className="px-2 py-2 rounded-[9px]"
                  value="indisponivel"
                  checked={status === "indisponivel"}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </label>
            </div>

            <div className="flex flex-col gap-2 pt-6">
              <label className="text-[#8C95AE]"> Em construção</label>
              <div className="flex gap-5">
                <label className="text-[#8C95AE] text-sm flex items-center gap-1">
                  {" "}
                  Sim
                  <input
                    type="radio"
                    className="px-2 py-2 rounded-[9px] "
                    value="sim"
                    checked={construction === true}
                    onChange={(e) => setConstruction(true)}
                  />
                </label>
                <label
                  htmlFor="titulo"
                  className="text-[#8C95AE] text-sm flex items-center gap-1 "
                >
                  {" "}
                  Não
                  <input
                    type="radio"
                    className="px-2 py-2 rounded-[9px]"
                    value="não"
                    checked={construction === false}
                    onChange={(e) => setConstruction(false)}
                  />
                </label>
              </div>

              <div className="flex flex-col gap-2 pt-6">
                <label htmlFor="endereco" className="text-[#8C95AE]">
                  {" "}
                  Endereço
                </label>
                <input
                  type="text"
                  id="endereco"
                  className="px-2 py-2 rounded-[9px]"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 grid-cols-2  gap-x-6 ">
              <div className="flex flex-col gap-2 pt-6">
                <label htmlFor="salas" className="text-[#8C95AE]">
                  {" "}
                  Salas
                </label>
                <input
                  type="number"
                  id="salas"
                  className="px-2 py-2 rounded-[9px]"
                  value={String(salas)}
                  onChange={(e) => setSalas(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2 pt-6">
                <label htmlFor="metragem" className="text-[#8C95AE]">
                  {" "}
                  Metragem (m²)
                </label>
                <input
                  type="number"
                  id="metragem"
                  className="px-2 py-2 rounded-[9px]"
                  value={String(metragem)}
                  onChange={(e) => setMetragem(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2 pt-6">
                <label htmlFor="andares" className="text-[#8C95AE]">
                  {" "}
                  Andares
                </label>
                <input
                  type="number"
                  id="andares"
                  className="px-2 py-2 rounded-[9px]"
                  value={String(andares)}
                  onChange={(e) => setAndares(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2 pt-6">
                <label htmlFor="vagas" className="text-[#8C95AE]">
                  {" "}
                  Vagas
                </label>
                <input
                  type="number"
                  id="vagas"
                  className="px-2 py-2 rounded-[9px]"
                  value={String(vagas)}
                  onChange={(e) => setVagas(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2 pt-6">
                <label htmlFor="banheiros" className="text-[#8C95AE]">
                  {" "}
                  Banheiros
                </label>
                <input
                  type="number"
                  id="banheiros"
                  className="px-2 py-2 rounded-[9px]"
                  value={String(banheiros)}
                  onChange={(e) => setBanheiros(Number(e.target.value))}
                />
              </div>
            </div>

            <label className="text-[#8C95AE] pt-6"> Tem mobília?</label>
            <div className="flex gap-5">
              <label className="text-[#8C95AE] text-sm flex items-center gap-1">
                {" "}
                Sim
                <input
                  type="radio"
                  className="px-2 py-2 rounded-[9px] "
                  value="sim"
                  checked={mobilia === true}
                  onChange={(e) => setMobilia(true)}
                />
              </label>
              <label
                htmlFor="titulo"
                className="text-[#8C95AE] text-sm flex items-center gap-1 "
              >
                {" "}
                Não
                <input
                  type="radio"
                  className="px-2 py-2 rounded-[9px]"
                  value="não"
                  checked={mobilia === false}
                  onChange={(e) => setMobilia(false)}
                />
              </label>
            </div>

            <div className="flex flex-col gap-2 pt-6">
              <label htmlFor="descricao" className="text-[#8C95AE]">
                {" "}
                Descrição do imóvel
              </label>
              <textarea
                id="descricao"
                className="px-2 py-2 rounded-[9px] h-[100px]"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>

          <a
            className="btn btn-primary w-full mt-6"
            onClick={() => handleSteps("second")}
          >
            {" "}
            Avançar{" "}
          </a>
        </div>
      )}
      {steps === StepsTypes.second && (
        <div className="h-full h-[500px]">
          <h3 className="text-center pb-[15px] text-[#2B3040]">Preços</h3>
          <div className="flex flex-col ">
            <div className="flex flex-col gap-2 pt-6">
              <label htmlFor="preco" className="text-[#8C95AE]">
                {" "}
                Preço
              </label>
              <input
                type="number"
                id="preco"
                className="px-2 py-2 rounded-[9px]"
                value={String(preco)}
                onChange={(e) => setPreco(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-2 pt-6">
              <label htmlFor="condominio" className="text-[#8C95AE]">
                {" "}
                Condomínio
              </label>
              <input
                type="number"
                id="condominio"
                className="px-2 py-2 rounded-[9px]"
                value={String(condo)}
                onChange={(e) => setCondo(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-2 pt-6">
              <label htmlFor="iptu" className="text-[#8C95AE]">
                {" "}
                IPTU
              </label>
              <input
                type="number"
                id="iptu"
                className="px-2 py-2 rounded-[9px]"
                value={String(iptu)}
                onChange={(e) => setIptu(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex w-full   mt-6 flex-nowrap">
            <a
              onClick={() => handleSteps("first")}
              className="btn btn-secondary w-max w-full"
            >
              {" "}
              Voltar
            </a>
            <a
              className="btn btn-primary w-max w-full"
              onClick={() => handleSteps("third")}
            >
              {" "}
              Avançar{" "}
            </a>
          </div>
        </div>
      )}

      {steps === StepsTypes.third && (
        <div className="h-full h-[500px]">
          <h3 className="text-center pb-[15px] text-[#2B3040]">Comodidades</h3>
          <div className="pb-[50px]">
            <h3 className="text-center pb-4 text-sm text-[#8C95AE]">
              Selecione as comodidades deste imóvel:
            </h3>
            <div className="flex flex-wrap gap-2 ">
              {comodidades &&
                comodidades.map((v, index) => {
                  return (
                    <div
                      className={`${
                        selectedComodidades.includes(v)
                          ? "bg-[#525458] text-gray-400"
                          : ""
                      } bg-[#ECEFF7] rounded-[9px] py-2 px-4 max-w-[180px] flex items-center justify-center  hover:shadow-lg hover:cursor-pointer transition-all`}
                      key={index}
                      onClick={() => setSelectComodidade(v)}
                    >
                      {v}
                    </div>
                  );
                })}
            </div>
            {/* <div className="flex flex-col gap-2 py-6 flex-0 items-center">
              <label
                htmlFor="comodidade"
                className="text-[#8C95AE] text-center text-sm"
              >
                {" "}
                Ou adicione uma nova
              </label>
              <input
                type="text"
                id="comodidade"
                className="px-2 py-2 rounded-[9px]  max-w-[200px]"
                value={comodidade}
                onChange={(e) => setComodidade(e.target.value)}
              />
            </div> */}

            <h3 className="text-center pb-4 pt-10 text-sm text-[#8C95AE]">
              Comodidades selecionadas:
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedComodidades &&
                selectedComodidades.map((v, index) => {
                  return <div className="bg-gray-200 px-4 py-2 rounded-md" key={index}>{v}</div>;
                })}
            </div>
          </div>

          <h3 className="text-center pb-[15px] text-[#2B3040]">Facilidades</h3>
          <div className="flex flex-col ">
              <div className="flex flex-col gap-2 py-6 flex-0 items-center">
                <label
                  htmlFor="school"
                  className="text-[#8C95AE] text-center text-sm"
                >
                  {" "}
                  Escolas
                </label>
                <input
                  type="text"
                  id="school"
                  className="px-2 py-2 rounded-[9px]  max-w-[200px]"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
             </div> 
             <div className="flex flex-col gap-2 py-6 flex-0 items-center">
                <label
                  htmlFor="hospital"
                  className="text-[#8C95AE] text-center text-sm"
                >
                  {" "}
                  Hospital
                </label>
                <input
                  type="text"
                  id="hospital"
                  className="px-2 py-2 rounded-[9px]  max-w-[200px]"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                />
             </div> 
             <div className="flex flex-col gap-2 py-6 flex-0 items-center">
                <label
                  htmlFor="transport"
                  className="text-[#8C95AE] text-center text-sm"
                >
                  {" "}
                  Transporte
                </label>
                <input
                  type="text"
                  id="transport"
                  className="px-2 py-2 rounded-[9px]  max-w-[200px]"
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                />
             </div> 
          </div>

           {/* /////////////////////////////////////////////// */}
          <div className="flex w-full   mt-6 flex-nowrap">
            <a
              onClick={() => handleSteps("second")}
              className="btn btn-secondary w-max w-full"
            >
              {" "}
              Voltar
            </a>
            <a
              className="btn btn-primary w-max w-full"
              onClick={() => handleSteps("fourth")}
            >
              {" "}
              Avançar{" "}
            </a>
          </div>
        </div>
      )}

      {steps === StepsTypes.fourth && (
        <div className="h-full h-[500px]">
          <h3 className="text-center pb-[15px] text-[#2B3040]">Imagens</h3>
          <div className="flex flex-col ">
            <div className="flex flex-col gap-2 pt-6">
              <label htmlFor="preco" className="text-[#8C95AE]">
                {" "}
                Imagens
              </label>
              <input type="file" onChange={uploadFile} />
            </div>
            <div className="flex flex-wrap gap-4 justify-center pt-10">
              {imagens && imagens.map((img)=>{
              return(
                <img width={200} height={100} key={img} src={img} alt='' onClick={()=> deleteImage(img)}/>
              )
               })}
            </div>
           
          </div>

          <div className="flex w-full   mt-6 flex-nowrap">
            <a
              onClick={() => handleSteps("third")}
              className="btn btn-secondary w-max w-full"
            >
              {" "}
              Voltar
            </a>
            <a
              className="btn btn-primary w-max w-full"
              onClick={() => handleForm()}
            >
              {" "}
              Publicar Imóvel
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
