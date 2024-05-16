"use client";

import React, { useEffect, useState } from "react";

interface PropTypes {
  comodidades: string[];
}

export default function Comodidades(props: PropTypes) {
  const [itens, setItens] = useState<React.JSX.Element[] | null>();

  interface Grupos {
    [key: string]: string;
  }

  const verificarGruposArray = (strings: string[]) => {
    const grupos: Grupos = {
      rooftop: "/icons/Roofing.svg",
      piscina: "/icons/Pool.svg",
      academia: "/icons/gym.svg",
      coworking: "/icons/Diversity.svg",
      bicicletario: "/icons/bike.svg",
      "salão de festas": "/icons/Celebration.svg",
      sauna: "/icons/Sauna.svg",
      "quadra de esportes": "/icons/Sports.svg",
      "salão de jogos": "/icons/Videogame.svg",
      "espaço Zen": "/icons/zen.svg",
      restaurantes: "/icons/restaurant.svg",
      "área pet": "/icons/Pets.svg",
    };

    const resultado: React.JSX.Element[] = [];

    strings.forEach((str) => {
      for (const grupo in grupos) {
        if (str.includes(grupo)) {
          resultado.push(
            <div key={str + grupo} className="flex gap-4 items-center">
              <img
                src={grupos[grupo]}
                alt={grupo}
                width={33}
                className="flex-0 flex-grow-0 flex-shrink-0"
              />
              <span className="text-[#8C95AE] font-normal text-lg">{str}</span>
            </div>
          );
        }
      }
    });

    // console.log("olha os resultados", resultado);

    return setItens(resultado);
  };

  useEffect(() => {
    verificarGruposArray(props.comodidades);
  }, []);

  useEffect(() => {
    // console.log(itens);
  }, [itens]);

  return (
    <div className="grid grid-cols-2 gap-y-6 gap-x-2 max-w-[600px] pt-10">
      {itens &&
        itens.map((v) => {
          // return <div key={v.key}>{v}</div>;
          return v;
        })}
    </div>
  );
}
