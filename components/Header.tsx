import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-col items-center py-[100px] px-5">
    
      <h1 className="text-slate-700 animate-in opacity-0 text-[40px] text-center z-[888] lg:text-6xl pt-[20px]">Exclusivos no coração de SP</h1>
      <p className="text-lg lg:text-xl !leading-tight text-[#3E434F] text-semibold mx-auto max-w-xl text-center pt-[20px] z-[88888]">
        Edifícios e espaços corporativos únicos para levar uma experiência de
        alto padrão à sua empresa
      </p>
      {/* <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent my-8" /> */}
    </div>
  );
}
