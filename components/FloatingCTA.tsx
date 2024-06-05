"use client";

import React from "react";

interface PropTypes {
  preco: string;
  condominio: string;
  IPTU: string;
}

export default function FloatingCTA(prop: PropTypes) {
  return (
    <div className="sticky bottom-[100px] flex-0  ">
      <div className="hidden lg:block bottom-0 sticky right-0 shadow-xl rounded-[9px] top-5 bg-[#ECEFF7] flex-0 flex-grow-0 flex-shrink-0 w-[350px] h-[350px] px-10 py-10">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h4 className="text-[#8C95AE] text-sm font-body">
              Valor do Imóvel
            </h4>
            <p className="text-[#111726] font-body text-[32px] font-bold">
              R$ {prop.preco}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between w-full ">
              <p className="text-[#8C95AE] font-body text-base">Condomínio</p>
              <p className="text-[#8C95AE] font-body text-base">
                R${prop.condominio}
              </p>
            </div>
            <div className="flex justify-between w-full ">
              <p className="text-[#8C95AE] font-body text-base">IPTU</p>
              <p className="text-[#8C95AE] font-body text-base">
                R${prop.IPTU}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button className="btn-primary btn "> Agendar Visita</button>
            <button className="btn-secondary btn text-[#3C5086] ">
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
