export default function Header() {
  return (
    <div className="flex flex-col items-center pt-[150px] px-5">
    
      <h1 className="title-hero-gradient  -tracking-wide leading-[50px] opacity-0 text-[40px] text-center font-bold z-[888] lg:text-6xl lg:pt-[60px]"> <span className="text-white ">Exclusivos</span> no coração de SP</h1>
      <p className="animate-in text-lg lg:text-2xl !leading-tight text-black text-semibold mx-auto max-w-[300px] lg:max-w-xl text-center pt-[40px] lg:pt-[20px] z-[88888]">
        Edifícios e espaços corporativos únicos para levar uma experiência de
        alto padrão à sua empresa
      </p>
      {/* <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent my-8" /> */}
    </div>
  );
}
