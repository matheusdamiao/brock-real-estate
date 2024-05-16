"use client";

import React, { useEffect, useState } from "react";

interface PropTypes {
  escolas: string;
  transporte: string;
  hospital: string;
}

export default function Proximidades(props: PropTypes) {
  return (
    <div className="flex flex-col lg:pt-[50px] gap-12 pt-10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <img
            src="/icons/transport.svg"
            className="flex-0 flex-grow-0 w-[33px] flex-shrink-0"
          />
          <h4 className="font-body text-[#494949] text-xl font-semibold">
            Transporte
          </h4>
        </div>
        <p className="text-[#8C95AE] text-base">{props.transporte}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <img
            src="/icons/hospital.svg"
            className="flex-0 flex-grow-0 flex-shrink-0 w-[33px]"
          />
          <h4 className="font-body text-[#494949] text-xl font-semibold">
            Hospital
          </h4>
        </div>
        <p className="text-[#8C95AE] text-base">{props.hospital}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <img
            src="/icons/escolas.svg"
            className="flex-0 flex-grow-0 flex-shrink-0 w-[33px]"
          />
          <h4 className="font-body text-[#494949] text-xl font-semibold">
            Escolas
          </h4>
        </div>
        <p className="text-[#8C95AE] text-base">{props.escolas}</p>
      </div>
    </div>
  );
}
