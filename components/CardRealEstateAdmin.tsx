"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Comodidades from "./Comodidades";
import Page from "@/app/[imovel]/page";
import { removeDiacritics } from "@/utils/removeDiacritics";
import { SupabaseUploadResponse } from "./CreateNewProperty";

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

export default function CardRealEstateAdmin(prop: PropertyType) {

  const ref = useRef(null);
  const confirmRef = useRef(null);

  const router = useRouter();
  /// GENERAL STATES FOR THE component
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(false);
  // ////////////////////////// States for the input values
  const [isTitle, setIsTitle] = useState(prop.titulo);
  const [isDescription, setIsDescription] = useState(prop.descricao)
  const [isStatus, setIsStatus] = useState(prop.status ? 'Disponível': 'Indisponível')
  const [isConstrucao, setIsConstrucao] = useState(prop.construcao ? 'Construcao': 'Finalizado')
  const [isAddress, setIsAddress] = useState(prop.endereco);
  const [isRoom, setIsRoom] = useState(prop.salas)
  const [isMeters, setIsMeters] = useState(prop.metragem)
  const [isCars, setIsCars] = useState(prop.vagas);
  const [isFloors, setIsFloors] = useState(prop.andares);
  const [isBathrooms, setIsBathrooms] = useState(prop.banheiro);
  const [isFurniture, setIsFurniture] = useState(prop.mobilia ? "Sim" : "Não");
  const [isIPTU, setIsIptu] = useState(prop.IPTU);
  const [isCondo, setIsCondo] = useState(prop.condominio);
  const [isPreco, setIsPreco] = useState(prop.preco);
  const [isAllComodidades, setIsAllComodidades] = useState(prop.comodidades)
  const [newComodidade, setNewComodidade] = useState('')
  const [isTransport, setIsTransport] = useState(prop.transporte);
  const [isHospital, setIsHospital] = useState(prop.hospital);
  const [isSchool, setIsSchool] = useState(prop.escola);
  const [isAllImages, setIsAllImages] = useState(prop.imagens);




  // //////////////////////////////////////////////// UI States for the card
  const [isGerais, setIsGerais] = useState(true);
  const [isValores, setIsValores] = useState(false);
  const [isComodidades, setIsComodidades] = useState(false);
  const [isFacilidades, setIsFacilidades] = useState(false);
  const [isImagens, setIsImagens] = useState(false);

  ///////////////////////////////////////////////////

  const supabase = createClient();

  const handleUpdate = async (e: FormEvent, id: number) => {
    e.preventDefault();

    setIsLoading(true);

    console.log("o novo titulo é esse", isTitle);

    const { error, data, status, statusText } = await supabase
      .from("property")
      .update({
        titulo: isTitle,
        descricao: isDescription,
        status: isStatus === "Disponível" ? true : false,
        construcao: isConstrucao === 'Construcao' ? true : false,
        endereco: isAddress,
        salas: isRoom,
        metragem: isMeters,
        vagas: isCars,
        andares: isFloors,
        banheiro: isBathrooms,
        mobilia: isFurniture === "Sim" ? true : false,
        preco: isPreco,
        condominio: isCondo,
        IPTU: isIPTU,
        comodidades: isAllComodidades,
        hospital: isHospital,
        transporte: isTransport,
        escola: isSchool,
        imagens: isAllImages,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.log("deu  erro", error);
    }

    if (data) {
      setTimeout(() => {
        setIsLoading(false);
        setIsUpdated(true);
      }, 1500);

      setTimeout(() => {
        setIsUpdated(false);
        // router.refresh();
        window.location.reload();
      }, 2500);
    }


    console.log("tem isso agora", data);
    console.log("esstatus", status);
    console.log("text status", statusText);
  };

 

  const handleNewComodidades = (value: string)=>{
    setIsAllComodidades((v)=>[...v, value])
  }

  const deleteComodidade = (value: string) =>{
    setIsAllComodidades((comodidades)=> 
      comodidades.filter((va)=> va !== value)
    )
  }


  const handleCardsSections = (section: string) => {

    if(section === 'gerais'){
      setIsGerais(!isGerais);
      setIsImagens(false);
      setIsFacilidades(false);
      setIsComodidades(false);
      setIsValores(false)
    }

    if(section === 'valores'){
      setIsValores(!isValores)
      setIsImagens(false);
      setIsFacilidades(false);
      setIsComodidades(false);
      setIsGerais(false);
    }

    if(section === 'comodidades'){
      setIsComodidades(!isComodidades)
      setIsImagens(false);
      setIsFacilidades(false);
      setIsValores(false)
      setIsGerais(false);
    }

    if(section === 'facilidades'){
      setIsFacilidades(!isFacilidades);
      setIsComodidades(false);
      setIsValores(false)
      setIsGerais(false);
      setIsImagens(false);
    }


    if(section === 'imagens'){
      setIsImagens(!isImagens);
      setIsFacilidades(false);
      setIsComodidades(false);
      setIsValores(false)
      setIsGerais(false);
    }
  }

  const openImage = () => {
    const dialog = ref.current as unknown as HTMLDialogElement;
    if(dialog){
      dialog.showModal()
    }
  }

  const closeImage = () => {
    const dialog = ref.current as unknown as HTMLDialogElement;
    if(dialog){
      dialog.close()
    }
  }

  const deleteImage = async (url: string) =>{

    const fileName = url.split('/').pop();
    console.log(fileName);

    const {data, error}  = await supabase.storage
                .from('brock')
                .remove([`imoveis/${prop.id}/${fileName}`])

                if(data){
                  console.log('resulto foi esse', data);
                  setIsAllImages((imgs)=> imgs.filter(img => img !== url))
               }
              
            if(error){
                console.log('deu erro', error);
                }
  
   }


  const confirmModal = () =>{
    let dialog = confirmRef.current as unknown as HTMLDialogElement;
    dialog.showModal()
  }

  const closeConfirmModal = () =>{
    let dialog = confirmRef.current as unknown as HTMLDialogElement;
    dialog.close()
  }

  const deleteProperty = async (id: number) =>{
    // delete property from the table
    const { error, status } = await supabase
    .from("property")
    .delete()
    .eq('id', id)


    // TODO: delete all images inside storage associated to that property
 


    if(error){
      alert('deu erro');
      console.log(error)
    }

    if(status){
      alert('Imóvel apagado!')
      console.log(status);
    }
    closeConfirmModal();
  }


  const uploadImage = async ( event: ChangeEvent & { target: HTMLInputElement }) =>{

    if(event.target.files && event.target.files?.length){

      const file = event.target?.files[0];
      const cleanedFileName = removeDiacritics(file.name);

      const bucket = `brock/imoveis/${prop.id}`;

      const dataResponse = await supabase.storage
                .from(bucket)
                .upload(cleanedFileName, file);

      const castedResponse = dataResponse as SupabaseUploadResponse;

      if(castedResponse.data){
        console.log(castedResponse.data)
        alert("Imagem adicionada!")
        setIsAllImages((imgs)=> [...imgs, `https://lqkcetrqfmsvcgxakfqv.supabase.co/storage/v1/object/public/${castedResponse.data?.fullPath}`])
      }

      if(castedResponse.error){
        console.log(castedResponse.error);
        alert('Deu erro no carregamento! Tente novamente');
      }

    }
  }

   
  const isDisabled =
   isTitle !== prop.titulo ? false : true &&
   isDescription !== prop.descricao ? false : true &&
   isStatus !== (prop.status ? "Disponível" : "Indisponível") ? false : true &&
   isConstrucao !== (prop.construcao ? "Construcao" : "Finalizado") ? false : true &&
   isAddress !== prop.endereco ? false : true &&
   isRoom !== prop.salas ? false : true &&
   isFloors !== prop.andares ? false : true &&
   isBathrooms !== prop.banheiro ? false : true &&
   isCars !== prop.vagas ? false : true &&
   isFurniture !== (prop.mobilia ? "Sim" : "Não") ? false : true &&
   isMeters !== prop.metragem ? false : true &&
   isPreco !== prop.preco ? false : true &&
   isCondo !== prop.condominio ? false : true &&
   isIPTU !== prop.IPTU ? false : true &&
   isAllComodidades !== prop.comodidades ? false : true &&
   isSchool !== prop.escola ? false : true &&
   isHospital !== prop.hospital ? false : true && 
   isTransport !== prop.transporte ? false : true &&
   isAllImages !== prop.imagens ? false : true
   

            
  return (
    <>
      {!isEdit ? (
        <div
          key={prop.id}
          className="flex flex-col gap-6 shadow-xl border-[1px] border-gray w-full rounded-lg px-6 py-6 lg:px-8 lg:py-8 relative bg-[#F2F2F2]"
        >
          <button
            className="absolute right-5 top-5 border-[1px] text-lg btn btn-secondary"
            onClick={() => setIsEdit(!isEdit)}
          >
            Editar
          </button> 

          <button
            className="absolute right-5 bottom-5"
            onClick={() => confirmModal()}
          >
            <img src='/icons/trash.svg' alt=''/>
          </button> 
          <dialog ref={confirmRef} className="max-w-[500px] w-[90%] mx-auto h-full max-h-[500px] ">
            <div className="flex flex-col items-center justify-center h-full w-full px-6 text-center">
              <p>Quer mesmo deletar o imóvel <span className="font-bold">{prop.titulo}</span> ?</p>
              <div className="flex gap-10 pt-10">
                <button className="bg-[#3C5086] text-white px-4 py-2 rounded-[9px]" onClick={()=>deleteProperty(prop.id)}>Sim</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-[9px]" onClick={()=>closeConfirmModal()}>Não</button>
              </div>
            </div>
          </dialog>
         
          <div className="flex gap-4 lg:flex-nowrap flex-wrap max-w-[300px]">
           
            <button className={`${isGerais && 'bg-gray-600 text-white'} px-6 py-2 bg-gray-200 rounded-md` }
                     onClick={()=> handleCardsSections("gerais")}>
               Gerais
             </button>
             <button className={`${isValores && 'bg-gray-600 text-white'} px-6 py-2 bg-gray-200 rounded-md` }
                     onClick={()=> handleCardsSections("valores")}>
               Valores
             </button>
           
             <button className={`${isComodidades && 'bg-gray-600 text-white'} px-6 py-2 bg-gray-200 rounded-md` }
                     onClick={()=> handleCardsSections("comodidades")}>
               Comodidades
             </button>

             <button className={`${isFacilidades && 'bg-gray-600 text-white'} px-6 py-2 bg-gray-200 rounded-md` }
                     onClick={()=> handleCardsSections("facilidades")}>
               Facilidades
             </button>
             <button className={`${isImagens && 'bg-gray-600 text-white'} px-6 py-2 bg-gray-200 rounded-md` }
                     onClick={()=> handleCardsSections("imagens")}>
               Imagens
             </button>
            
             
          </div>
          <small>ID: {prop.id}</small>
          {isGerais &&
          <div className="flex lg:flex-nowrap flex-wrap gap-8 lg:gap-24">
            <div className="flex flex-col gap-5">
              <div>
                <h2>Título: {prop.titulo}</h2>
                <h3>Status: {prop.status ? "Disponível" : "Indisponível"}</h3>
                <h3>Estado do Imóvel: {prop.construcao ? "Em construção" : "Finalizado"}</h3>
              </div>

              <div className="flex gap-4">
                Endereço:
                <p className="max-w-[250px]">{prop.endereco}</p>
              </div>

            
            </div>
            <div className="flex flex-col gap-5 max-w-[450px]">
              <div className=" flex gap-4">
                Descrição:
                <p className="text-clip line-clamp-4 ... overflow-hidden">
                  {prop.descricao}
                </p>
              </div>
                <div className="flex items-center lg:flex-nowrap flex-wrap  justify-between ">
                    <div className="grid lg:grid-cols-3 grid-cols-2  gap-x-6 ">
                      <p>Salas: {prop.salas}</p>
                      <p>Metragem: {prop.metragem} m²</p>
                      <p>Vagas: {prop.vagas}</p>
                      <p>Andares: {prop.andares}</p>
                      <p>Banheiros: {prop.banheiro}</p>
                      <p>Mobília: {prop.mobilia ? "Sim" : "Não"}</p>
                    </div>    
                </div>
            </div>
         </div>
        }
        {isValores &&
          <div>
            <h3>Valores </h3>
            <div className="flex gap-2 lg:gap-10">
              <p>Preço: {prop.preco}</p>
              <p>Condomínio:{prop.condominio}</p>
              <p>IPTU:{prop.IPTU}</p>
            </div>
          </div>
        }


        {isComodidades &&
        
        <div className="flex lg:flex-row flex-col items-center justify-between">
            <div>
              <h3>Comodidades</h3>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {prop.comodidades.map((cmd, index) => {
                  return <div className="text-gray-600" key={index}>{cmd}</div>;
                })}
              </div>
            </div>

        </div>
        
        
        }


        {isFacilidades &&
          
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
        
        
        
        }

        {isImagens &&
          <div className="flex lg:flex-row flex-col items-center justify-between">
              {prop.imagens &&
                <div className="flex gap-4">
                  {prop.imagens.map((img)=>{
                    return <img key={img} src={img} className="max-w-[150px] object-cover"/>
                  })}
                </div>
              }
          </div>
        
        }
        
        </div>
      ) : (
        <form
          onSubmit={(e) => handleUpdate(e, prop.id)}
          key={prop.id}
          className="flex flex-col gap-6 shadow-xl border-[1px] border-gray rounded-lg px-8 py-8 relative bg-[#F2F2F2]"
        >
          <button
            className="absolute right-5 top-5 border-[1px] text-lg btn btn-secondary"
            onClick={() => setIsEdit(!isEdit)}
            type="button"
          >
            Voltar
          </button>



          <div className="flex gap-4 lg:flex-nowrap flex-wrap max-w-[300px]">
           
            <button type="button" className={`${isGerais && 'bg-gray-600 text-white'} px-6 py-2 bg-gray-200 rounded-md` }
                     onClick={()=> handleCardsSections("gerais")}>
               Gerais
             </button>
             <button type="button" className={`${isValores && 'bg-gray-600 text-white'} px-6 py-2 bg-gray-200 rounded-md` }
                     onClick={()=> handleCardsSections("valores")}>
               Valores
             </button>
           
             <button type="button" className={`${isComodidades && 'bg-gray-600 text-white'} px-6 py-2 bg-gray-200 rounded-md` }
                     onClick={()=> handleCardsSections("comodidades")}>
               Comodidades
             </button>

             <button type="button" className={`${isFacilidades && 'bg-gray-600 text-white'} px-6 py-2 bg-gray-200 rounded-md` }
                     onClick={()=> handleCardsSections("facilidades")}>
               Facilidades
             </button>
             <button type="button" className={`${isImagens && 'bg-gray-600 text-white'} px-6 py-2 bg-gray-200 rounded-md` }
                     onClick={()=> handleCardsSections("imagens")}>
               Imagens
             </button>
            
             
          </div>

          <small>ID: {prop.id}</small>
          {isGerais &&
          <div className="flex lg:flex-nowrap flex-wrap gap-8 lg:gap-24">
           <div className="flex flex-col">
              <div>
                <h2>Título: </h2>
                <input
                  type="text"
                  value={isTitle}
                  className=" px-2 py-2 rounded-lg bg-[#E6E7EB]"
                  onChange={(e) => setIsTitle(e.target.value)}
                />
              </div>
              <label htmlFor="status" className="pt-3"> Status</label>
                <select
                  id='status'
                  value={isStatus}
                  onChange={(e)=> setIsStatus(e.target.value)}
                  >
                  <option value="Disponível">Disponível </option>
                  <option value="Indisponível">Indisponível</option>
                </select>
                <label htmlFor="construcao" className="pt-3"> Estado do Imóvel</label>
                <select
                  id='construcao'
                  value={isConstrucao}
                  onChange={(e)=> setIsConstrucao(e.target.value)}
                  >
                  <option value="Construcao">Em construção  </option>
                  <option value="Finalizado">Finalizado</option>
                </select>
              
            </div>

            <div className="flex flex-col gap-4">
                <h2>Endereço:</h2>
                <input
                  type="text"
                  value={isAddress}
                  className=" px-2 py-2 rounded-lg flex-0 flex-grow-0 flex-shrink-0 bg-[#E6E7EB]"
                  onChange={(e) => setIsAddress(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-5 max-w-[400px]">
                  <h2>Descrição:</h2>
                <textarea
                  value={isDescription}
                  className=" px-2 py-2 rounded-lg flex-0 flex-grow-0 flex-shrink-0 bg-[#E6E7EB]"
                  onChange={(e) => setIsDescription(e.target.value)}
                />
                <div className="flex items-center lg:flex-nowrap flex-wrap  justify-between ">
                    <div className="grid lg:grid-cols-3 grid-cols-2  gap-x-6 ">
                      <p className="flex gap-2 items-center justify-center lg:pt-0 pt-3">Salas:
                         <input className="w-[50px]" type="number" value={isRoom} onChange={(e)=> setIsRoom(Number(e.target.value))}/>
                      </p>
                      <p className="flex gap-2 items-center justify-center lg:pt-0 pt-3">Metragem:
                         <input className="w-[50px]" type="number" value={isMeters} onChange={(e)=> setIsMeters(Number(e.target.value))}/>
                      </p>
                      <p className="flex gap-2 items-center justify-center lg:pt-0 pt-3">Vagas:
                         <input className="w-[50px]" type="number" value={isCars} onChange={(e)=> setIsCars(Number(e.target.value))}/>
                      </p>
                      <p className="flex gap-2 items-center justify-center lg:pt-0 pt-3">Andares:
                         <input className="w-[50px]" type="number" value={isFloors} onChange={(e)=> setIsFloors(Number(e.target.value))}/>
                      </p>
                      <p className="flex gap-2 items-center justify-center lg:pt-0 pt-3">Banheiros:
                         <input className="w-[50px]" type="number" value={isBathrooms} onChange={(e)=> setIsBathrooms(Number(e.target.value))}/>
                      </p>
                      <div className="flex gap-2 items-center justify-center lg:pt-0 pt-3">
                        <label htmlFor="mobilia" className=""> Mobília</label>
                        <select
                            id='mobilia'
                            className="flex-0 flex-grow-0 h-min"
                            value={isFurniture}
                            onChange={(e)=> setIsFurniture(e.target.value)}
                            >
                            <option value="Sim">Sim  </option>
                            <option value="Não">Não</option>
                        </select>
                      </div>
                    </div>    
                </div>
            </div>
          </div>
        }

          {isValores &&
                <div>
                      <h3>Valores </h3>
                      <div className="flex gap-2 lg:gap-10">
                        <div className="flex items-center gap-2">
                          <p>Preço: </p>
                          <input
                          type="text"
                          value={isPreco}
                          className=" px-2 py-2 rounded-lg flex-0 flex-grow-0 max-w-[100px] flex-shrink-0 bg-[#E6E7EB]"
                          onChange={(e) => setIsPreco(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <p>Condomínio:</p>
                          <input
                            type="text"
                            value={isCondo}
                            className=" px-2 py-2 rounded-lg flex-0 flex-grow-0 flex-shrink-0 max-w-[100px] bg-[#E6E7EB]"
                            onChange={(e) => setIsCondo(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <p>IPTU:</p>
                          <input
                            type="text"
                            value={isIPTU}
                            className=" px-2 py-2 rounded-lg flex-0 flex-grow-0 max-w-[100px] flex-shrink-0 bg-[#E6E7EB]"
                            onChange={(e) => setIsIptu(e.target.value)}
                          />
                        </div>
                      </div>
                  </div>
               }
         

           {isComodidades &&
              
              <div className="flex lg:flex-row flex-col items-center justify-between">
                  <div>
                    <div className="flex gap-2 flex-col justify-center">
                      <h3>Comodidades</h3>
                      <small className=" bg-red-200 text-xs px-2 py-1 w-max">Para apagar, clique nos itens</small>
                    </div>
                    <div className="grid grid-cols-2 pt-2 gap-2">
                     
                      {isAllComodidades.map((cmd, index) => {
                        return <div key={index} onClick={()=>{deleteComodidade(cmd)}}  className="hover:cursor-pointer text-gray-600 transition-colors px-2 py-2 hover:text-white rounded-[9px] hover:bg-slate-700">
                           {cmd}
                          </div>;
                      })}
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                          <p>Adicione uma nova:</p>
                          <input
                            type="text"
                            value={newComodidade}
                            className=" px-2 py-2 rounded-lg flex-0 flex-grow-0 max-w-[100px] flex-shrink-0 bg-[#E6E7EB]"
                            onChange={(e) => setNewComodidade(e.target.value)}
                          />
                          <button type="button" onClick={()=>handleNewComodidades(newComodidade)} className="bg-[#b8c6ee] px-2 py-2 rounded-lg">Adicionar comodidade</button>
                        </div>
                  </div>

              </div>
              
              
          }

          {isFacilidades &&
          
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
                  <div className="flex items-center gap-2  w-full max-w-[400px]">
                      <input
                        type="text"
                        value={isSchool}
                        className=" px-2 py-2 rounded-lg w-full  bg-[#E6E7EB]"
                        onChange={(e) => setIsSchool(e.target.value)}
                      />
                  </div>
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
                  <div className="flex items-center gap-2  w-full max-w-[400px]">
                      <input
                        type="text"
                        value={isHospital}
                        className=" px-2 py-2 rounded-lg w-full  bg-[#E6E7EB]"
                        onChange={(e) => setIsHospital(e.target.value)}
                      />
                  </div>
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

                  <div className="flex items-center gap-2  w-full max-w-[400px]">
                      <input
                        type="text"
                        value={isTransport}
                        className=" px-2 py-2 rounded-lg w-full  bg-[#E6E7EB]"
                        onChange={(e) => setIsTransport(e.target.value)}
                      />
                  </div>
                </div>
              </div>
            </div>
        
          }

          {isImagens &&
             <div className="flex lg:flex-row flex-col items-center justify-between">
              {isAllImages &&
                <div className="flex gap-4">
                  {isAllImages.map((img)=>{
                    return (
                      <div key={img} className="bg-white w-full">
                        <div key={img} className="relative w-full max-w-[150px] h-full ">
                          <span className="absolute bottom-0 text-white bg-black px-2 py-1 hover:cursor-pointer" onClick={()=>deleteImage(img)} >Delete</span>
                          <img key={img} src={img} className="object-cover h-full" />
                        </div>
                        
                        {/* <dialog ref={ref} className=" !m-0  !max-w-[100vw] w-full h-full !max-h-[100vh] bg-slate-500/50 fixed" onClick={()=> setIsOpenImage(false)}>
                            <div className="flex items-center justify-center h-full px-10 relative">
                              <img src={img} alt="" className="w-full  max-w-[900px]"  />
                              <button type='button' onClick={()=> closeImage()} className=" absolute bottom-10 lg:bottom-12  bg-[#3C5086] text-white px-2 py-2"> FECHAR</button>
                            </div>
                           
                        </dialog> */}
                            
                          
                      </div>
                    )
                  })}
                  
                  
                </div>
              }
               <input type="file" onChange={uploadImage} />
            </div>
        
          }

          <button
            className="bottom-5 left-5 px-4 py-4 w-full bg-primary text-white rounded-[9px] disabled:bg-secondary disabled:text-[#5A6072]"
            // disabled={isTitle !== prop.titulo ? false : true}
            disabled={isDisabled}
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
